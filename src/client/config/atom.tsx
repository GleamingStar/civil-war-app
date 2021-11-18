import { atom } from 'recoil';
import { TEntry, TPlayer } from 'shared/types';

const defaultPlayer: Array<TEntry> =
  JSON.parse(window.localStorage.getItem('entry')) || Array.from({ length: 10 }, (_, id) => ({ id, value: '' }));

export const entryAtom = atom<Array<TEntry>>({
  key: 'entry',
  default: defaultPlayer,
});

export const playersAtom = atom<Array<TPlayer>>({
  key: 'players',
  default: [],
});
