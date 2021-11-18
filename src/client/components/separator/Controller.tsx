import axios from 'axios';
import styled from 'styled-components';
import { ChangeEvent } from 'react';
import { useRecoilState } from 'recoil';
import { entryAtom, playersAtom } from 'client/config/atom';
import { TEntry, TPlayer } from 'shared/types';

const ControllerWrapper = styled.div`
  position: relative;
  top: -20px;
  width: 220px;
  height: 280px;
`;
const InputWrapper = styled.div`
  height: 220px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  input {
    background-color: #333;
    width: 95px;
    margin-bottom: 18px;
    color: #fff;
  }
`;
const ConfirmButton = styled.button`
  position: absolute;
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
  const [_, setPlayers] = useRecoilState(playersAtom);

  const inputChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;
    const id = +name;

    setEntry((player) => [...player.slice(0, id), { id, value }, ...player.slice(id + 1, player.length)]);
  };

  const playerInput = ({ id, value }: TEntry) => (
    <input key={id} name={id.toString()} value={value} onChange={inputChangeHandler} />
  );

  const clickHandler = async () => {
    localStorage.setItem('entry', JSON.stringify(entry));

    const getInfo = (i: number) =>
      new Promise(async (res, rej) => {
        try {
          const { data } = await axios.get(encodeURI(`/player/${entry[i].value}`));
          res(data);
        } catch (error) {
          rej(error);
        }
      });

    const promiseArr = getRandomOrder(10).map(getInfo);

    try {
      setPlayers((await Promise.all(promiseArr)) as Array<TPlayer>);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ControllerWrapper>
      <InputWrapper>{entry.map(playerInput)}</InputWrapper>
      <ConfirmButton onClick={clickHandler}>시작</ConfirmButton>
    </ControllerWrapper>
  );
};

export default Controller;
