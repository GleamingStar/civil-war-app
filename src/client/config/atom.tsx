import axios from 'axios';
import { atom, selectorFamily } from 'recoil';
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

export const locationFilter = [
  { id: 0, name: 'KR', value: 'kr' },
  { id: 1, name: 'JP', value: 'jp1' },
  { id: 2, name: 'NA', value: 'na1' },
  { id: 3, name: 'EUW', value: 'euw1' },
  { id: 4, name: 'EUNE', value: 'ewne1' },
];

export const filterIndexAtom = atom<number>({
  key: 'filterIndex',
  default: 0,
});

export const infoSelector = selectorFamily<TPlayer, string>({
  key: 'result',
  get:
    (userID) =>
    async ({ get }) => {
      const location = locationFilter[get(filterIndexAtom)];
      try {
        const { data } = await axios.get(encodeURI(`/player?location=${location.value}&id=${userID}`));
        return data;
      } catch (error) {
        console.log(error);
      }
    },
});

export const emptyEntryAtom = atom<Array<number>>({
  key: 'emptyEntry',
  default: [],
});
