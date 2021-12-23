import styled from 'styled-components';
import axios from 'axios';
import { ChangeEvent } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue } from 'recoil';
import { currentFilterSelector, emptyEntryAtom, entryAtom, isPlayingAtom, playersAtom, recordSelector } from 'client/config/atom';
import { TEntry } from 'shared/types';
import { VscSync } from 'react-icons/vsc';

const ControllerWrapper = styled.div`
  position: relative;
  width: 220px;
  height: 280px;
  opacity: 0.65;
  @media screen and (min-width: 786px) {
    opacity: 1;
  }
  z-index: 1;
`;
const InputWrapper = styled.div`
  height: 220px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;
const EntryInput = styled.input<{ empty: boolean }>`
  background-color: ${({ empty }) => (empty ? '#afafaf' : '#333')};
  width: 95px;
  margin-bottom: 18px;
  color: #fff;
  ::placeholder {
    text-align: center;
    font-size: 10px;
  }
`;
const ButtonWrapper = styled.div<{ isPlaying: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ isPlaying }) => (isPlaying ? 'space-between' : 'center')};
  padding: 0px 8px;
`;
const Button = styled.button`
  height: 25px;
  background-color: #555;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const getRandomOrder = (length: number): Array<number> => {
  const order: Set<number> = new Set();
  while (order.size < length) order.add(Math.floor(Math.random() * length));
  return [...order];
};

const Controller = () => {
  const [entry, setEntry] = useRecoilState(entryAtom);
  const [players, setPlayers] = useRecoilState(playersAtom);
  const location = useRecoilValue(currentFilterSelector);
  const [emptyEntry, setEmptyEntry] = useRecoilState(emptyEntryAtom);
  const [isPlaying, setPlaying] = useRecoilState(isPlayingAtom);
  const refreshRecord = useRecoilRefresher_UNSTABLE(recordSelector)

  const inputChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;
    const id = +name;

    setEntry((player) => [...player.slice(0, id), { id, value }, ...player.slice(id + 1, player.length)]);
  };

  const isEntryEmpty = () => {
    setEmptyEntry([]);
    const emptyEntry = entry.filter(({ value }) => value === '').map(({ id }) => id);
    if (emptyEntry.length === 0) return false;
    setEmptyEntry(emptyEntry);
    return true;
  };

  const clickConfirmHandler = () => {
    if (isEntryEmpty()) return;

    localStorage.setItem('entry', JSON.stringify(entry));
    setPlayers(getRandomOrder(10).map((i) => entry[i]));
    setPlaying(true);
  };

  const clickWinHandler = async (color: 'BLUE' | 'RED') => {
    const win =
      color === 'BLUE' ? players.slice(0, 5).map(({ value }) => value) : players.slice(5, 10).map(({ value }) => value);
    const lose =
      color === 'BLUE' ? players.slice(5, 10).map(({ value }) => value) : players.slice(0, 5).map(({ value }) => value);
    setPlaying(false);
    setPlayers([]);
    try {
      await axios.post(`/stat?location=${location.value}`, { win, lose });
      refreshRecord();
    } catch (error) {
      console.log(error);
    }
  };

  const playerInput = ({ id, value }: TEntry) => {
    const isEmpty = emptyEntry.findIndex((e) => e === id) !== -1;
    return (
      <EntryInput
        autoComplete={'off'}
        key={id}
        empty={isEmpty}
        placeholder={isEmpty ? '빈칸을 채워주세요' : ''}
        name={id.toString()}
        value={value}
        onChange={inputChangeHandler}
      />
    );
  };

  return (
    <ControllerWrapper>
      <InputWrapper>{entry.map(playerInput)}</InputWrapper>
      <ButtonWrapper isPlaying={isPlaying}>
        {isPlaying && <Button onClick={() => clickWinHandler('BLUE')}>🔵 승리</Button>}
        <Button onClick={clickConfirmHandler}>{isPlaying ? <VscSync color="#fff" size={16} /> : '시작'}</Button>
        {isPlaying && <Button onClick={() => clickWinHandler('RED')}>승리 🔴</Button>}
      </ButtonWrapper>
    </ControllerWrapper>
  );
};

export default Controller;
