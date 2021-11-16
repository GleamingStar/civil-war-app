import express from 'express';
import axios from 'axios';
import { ETier, TLeagueInfo, TPlayer } from 'shared/types';

const router = express.Router();

const defaultInfo = (name: string): TPlayer => ({
  name,
  tier: ETier.unranked,
  rank: 'I',
  leaguePoints: 0,
});

const infoParser = (name: string, data: Array<TLeagueInfo>): TPlayer => {
  if (data.length === 0) return defaultInfo(name);

  const { summonerName, tier, rank, leaguePoints } =
    data.find(({ queueType }) => queueType === 'RANKED_SOLO_5x5') ||
    data.find(({ queueType }) => queueType === 'RANKED_FLEX_SR');

  return { name: summonerName, tier, rank, leaguePoints };
};

router.get('/:player_id', async (req, res) => {
  const { player_id } = req.params;

  let id;

  try {
    const URL = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${player_id}?api_key=${process.env.RIOT_API_KEY}`;
    const { data } = await axios.get(encodeURI(URL));

    id = data.id;
  } catch ({ response }) {
    const { status, message } = response;

    if (status === 403) res.status(403).send({ message: 'Unavailable API KEY' });
    else if (status === 404) res.send(defaultInfo(player_id));
    else res.status(status).send(message);

    return;
  }

  try {
    const URL = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.RIOT_API_KEY}`;
    const { data } = await axios.get(URL);

    res.send(infoParser(player_id, data));
  } catch ({ response }) {
    const { status, message } = response;

    res.status(status).send(message);
  }
});

export default router;
