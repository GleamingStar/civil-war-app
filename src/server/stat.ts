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
  const { result }: { result: { win: Array<string>; lose: Array<string> } } = req.body;

  const connection = await mysql.createConnection(dbConfig);

  const insertQuery = (result: 'win' | 'lose', id: string, count: number, rating: number) =>
    `INSERT INTO ${location} (userId, ${result}, rating) VALUES ('${id}', ${++count}, ${rating})`;

  const updateQuery = (result: 'win' | 'lose', id: string, count: number, rating: number) =>
    `UPDATE ${location} SET ${result}=${++count}, rating=${rating} WHERE userId='${id}'`;

  const winner: Array<TStat> = await Promise.all(
    result.win.map(async (id) => {
      const [rows] = await connection.query(`SELECT win,rating FROM ${location} WHERE userID='${id}'`);
      return !rows[0] ? { id, win: 0, rating: 1000, newbie: true } : { id, ...rows[0] };
    })
  );

  const loser: Array<TStat> = await Promise.all(
    result.lose.map(async (id) => {
      const [rows] = await connection.query(`SELECT lose,rating FROM ${location} WHERE userID='${id}'`);
      return !rows[0] ? { id, lose: 0, rating: 1000, newbie: true } : { id, ...rows[0] };
    })
  );

  const winnerRating = winner.reduce((acc, { rating }) => acc + rating, 0) / winner.length;
  const loserRating = loser.reduce((acc, { rating }) => acc + rating, 0) / loser.length;

  const changedRating = getRating(getWinRate(winnerRating, loserRating));

  await Promise.all(
    winner.map(async ({ id, win, rating, newbie }) => {
      return newbie
        ? await connection.query(insertQuery('win', id, win, rating + changedRating))
        : await connection.query(updateQuery('win', id, win, rating + changedRating));
    })
  );

  await Promise.all(
    loser.map(async ({ id, lose, rating, newbie }) => {
      return newbie
        ? await connection.query(insertQuery('lose', id, lose, rating - changedRating))
        : await connection.query(updateQuery('lose', id, lose, rating - changedRating));
    })
  );

  res.status(200);
});

router.get(`/`, async (req, res) => {
  const { location } = req.query;

  const connection = await mysql.createConnection(dbConfig);

  const [rows] = await connection.query(`SELECT * from ${location}`);

  res.send(rows);
});

export default router;
