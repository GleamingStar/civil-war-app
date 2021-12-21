import express from 'express';
import mysql from 'mysql2/promise';
import { TStat } from 'shared/types';

const router = express.Router();

const K = 40; // 승패 가중치

const dbConfig = {
  host: process.env.DATABASE_IP,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: 'stat',
};

const getWinRate = (friendlyRating: number, enemyRating: number): number =>
  1 / (10 ** ((enemyRating - friendlyRating) / 400) + 1);

const getRating = (winRate: number): number => K * (1 - winRate);

router.post('/', async (req, res) => {
  const { location } = req.query;
  const { win, lose }: { win: Array<string>; lose: Array<string> } = req.body;

  const connection = await mysql.createConnection(dbConfig);

  const defaultStat = (userId: string): TStat => ({ userId, win: 0, lose: 0, rating: 1000, newbie: true });

  const query = {
    select: (userId: string) => `SELECT win,lose,rating FROM ${location} WHERE userID='${userId}'`,
    insert: (result: 'win' | 'lose', userId: string, count: number, rating: number) =>
      `INSERT INTO ${location} (userId, ${result}, rating) VALUES ('${userId}', ${++count}, ${rating})`,
    update: (result: 'win' | 'lose', userId: string, count: number, rating: number) =>
      `UPDATE ${location} SET ${result}=${++count}, rating=${rating} WHERE userId='${userId}'`,
  };

  const winner: Array<TStat> = await Promise.all(
    win.map(async (userId) => {
      const [rows] = await connection.query(query.select(userId));
      return !rows[0] ? defaultStat(userId) : { userId, ...rows[0] };
    })
  );

  const loser: Array<TStat> = await Promise.all(
    lose.map(async (userId) => {
      const [rows] = await connection.query(query.select(userId));
      return !rows[0] ? defaultStat(userId) : { userId, ...rows[0] };
    })
  );

  const winnerRating = winner.reduce((acc, { rating }) => acc + rating, 0) / winner.length;
  const loserRating = loser.reduce((acc, { rating }) => acc + rating, 0) / loser.length;

  const changedRating = getRating(getWinRate(winnerRating, loserRating));

  await Promise.all(
    winner.map(async ({ userId, win, rating, newbie }) => {
      return newbie
        ? await connection.query(query.insert('win', userId, win, rating + changedRating))
        : await connection.query(query.update('win', userId, win, rating + changedRating));
    })
  );

  await Promise.all(
    loser.map(async ({ userId, lose, rating, newbie }) => {
      return newbie
        ? await connection.query(query.insert('lose', userId, lose, rating - changedRating))
        : await connection.query(query.update('lose', userId, lose, rating - changedRating));
    })
  );

  res.send({ message: 'OK' });
});

router.get(`/`, async (req, res) => {
  const { location } = req.query;

  const connection = await mysql.createConnection(dbConfig);

  const [rows] = await connection.query(`SELECT * from ${location}`);

  res.send(rows);
});

export default router;
