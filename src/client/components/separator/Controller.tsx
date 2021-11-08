import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

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

type TPlayer = {
  id: number;
  value: string;
};

const Controller = () => {
  const defaultPlayer: Array<TPlayer> =
    JSON.parse(window.localStorage.getItem('player')) || Array.from({ length: 10 }, (_, id) => ({ id, value: '' }));

  const [player, setPlayer] = useState(defaultPlayer);

  const inputChangeHandler = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;
    const id = +name;

    setPlayer((player) => [...player.slice(0, id), { id, value }, ...player.slice(id + 1, player.length)]);
  };

  const playerInput = ({ id, value }: TPlayer) => (
    <input key={id} name={id.toString()} value={value} onChange={inputChangeHandler} />
  );

  return (
    <ControllerWrapper>
      <InputWrapper>{player.map(playerInput)}</InputWrapper>
      <ConfirmButton>시작</ConfirmButton>
    </ControllerWrapper>
  );
};

export default Controller;
