import axios from 'axios';
import { atom, selector, selectorFamily } from 'recoil';
import { TEntry, TPlayer, TRecord } from 'shared/types';

const defaultEntry: Array<TEntry> =
  JSON.parse(window.localStorage.getItem('entry')) || Array.from({ length: 10 }, (_, id) => ({ id, value: '' }));

export const entryAtom = atom<Array<TEntry>>({
  key: 'entry',
  default: defaultEntry,
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
  { id: 4, name: 'EUN', value: 'ewn1' },
];

export const filterIndexAtom = atom<number>({
  key: 'filterIndex',
  default: 0,
});

export const currentFilterSelector = selector({
  key: 'currentFilter',
  get: ({ get }) => locationFilter[get(filterIndexAtom)],
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

export const recordSelector = selector<Array<TRecord>>({
  key: 'record',
  get: async ({ get }) => {
    const location = locationFilter[get(filterIndexAtom)];
    try {
      const { data } = await axios.get(encodeURI(`/stat?location=${location.value}`));
      return data;
    } catch (error) {
      console.log(error);
    }
  },
});

const recordSorter = [
  { id: 0, sorter: (a: TRecord, b: TRecord) => (b.userId.toUpperCase() > a.userId.toUpperCase() ? 1 : -1) },
  { id: 1, sorter: (a: TRecord, b: TRecord) => (a.userId.toUpperCase() > b.userId.toUpperCase() ? 1 : -1) },
  { id: 2, sorter: (a: TRecord, b: TRecord) => b.rating - a.rating },
  { id: 3, sorter: (a: TRecord, b: TRecord) => a.rating - b.rating },
  { id: 4, sorter: (a: TRecord, b: TRecord) => b.win - a.win },
  { id: 5, sorter: (a: TRecord, b: TRecord) => a.win - b.win },
  { id: 6, sorter: (a: TRecord, b: TRecord) => b.lose - a.lose },
  { id: 7, sorter: (a: TRecord, b: TRecord) => a.lose - b.lose },
  { id: 8, sorter: (a: TRecord, b: TRecord) => b.win / (b.win + b.lose) - a.win / (a.win + a.lose) },
  { id: 9, sorter: (a: TRecord, b: TRecord) => a.win / (a.win + a.lose) - b.win / (b.win + b.lose) },
];

export const sorterIndexAtom = atom<number>({
  key: 'sorterIndex',
  default: 2,
});

export const sortedRecordSelector = selector<Array<TRecord>>({
  key: 'sortedRecord',
  get: ({ get }) => [...get(recordSelector)].sort(recordSorter[get(sorterIndexAtom)].sorter),
});

export const emptyEntryAtom = atom<Array<number>>({
  key: 'emptyEntry',
  default: [],
});

export const isPlayingAtom = atom<boolean>({
  key: 'isPlaying',
  default: false,
});
