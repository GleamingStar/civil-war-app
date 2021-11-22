import axios from 'axios';
import { atom, selector, selectorFamily } from 'recoil';
import { TEntry, TPlayer } from 'shared/types';

const defaultPlayer: Array<TEntry> =
  JSON.parse(window.localStorage.getItem('entry')) || Array.from({ length: 10 }, (_, id) => ({ id, value: '' }));

export const entryAtom = atom<Array<TEntry>>({
  key: 'entry',
  default: defaultPlayer,
});

export const playersAtom = atom<Array<TEntry>>({
  key: 'players',
  default: [],
});

export const infoSelector = selectorFamily<TPlayer, string>({
  key: 'result',
  get: (userID) => async () => {
    try {
      const { data } = await axios.get(encodeURI(`/player/${userID}`));
      return data;
    } catch (error) {
      console.log(error);
    }
  },
});