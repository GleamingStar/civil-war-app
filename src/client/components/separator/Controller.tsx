import styled from 'styled-components';
import { ChangeEvent } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { emptyEntryAtom, entryAtom, playersAtom } from 'client/config/atom';
import { TEntry } from 'shared/types';

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
const ConfirmButton = styled.button`
  position: absolute;
  width: 43px;
  height: 25px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #555;
  color: #fff;
`;

const getRandomOrder = (length: number): Array<number> => {
  const order: Set<number> = new Set();
  while (order.size < length) order.add(Math.floor(Math.random() * length));
  return [...order];
};

const Controller = () => {
  const [entry, setEntry] = useRecoilState(entryAtom);
  const setPlayers = useSetRecoilState(playersAtom);
  const [emptyEntry, setEmptyEntry] = useRecoilState(emptyEntryAtom);

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
    console.log('isEntryempty', emptyEntry);
    return true;
  };

  const clickHandler = () => {
    if (isEntryEmpty()) return;

    localStorage.setItem('entry', JSON.stringify(entry));
    setPlayers(getRandomOrder(10).map((i) => entry[i]));
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
      <ConfirmButton onClick={clickHandler}>시작</ConfirmButton>
    </ControllerWrapper>
  );
};

export default Controller;
