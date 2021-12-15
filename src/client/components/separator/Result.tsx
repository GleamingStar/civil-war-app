import { infoSelector, playersAtom } from 'client/config/atom';
import { Suspense } from 'react';
import { PulseLoader } from 'react-spinners';
import { useRecoilValue } from 'recoil';
import { TEntry } from 'shared/types';
import styled from 'styled-components';

const TeamWrapper = styled.ul<{ teamColor: 'BLUE' | 'RED' }>`
  position: absolute;
  top: 121px;
  left: ${({ teamColor }) => (teamColor === 'BLUE' ? '9px' : '190px')};
  @media screen and (min-width: 786px) {
    left: ${({ teamColor }) => (teamColor === 'BLUE' ? '25px' : '565px')};
  }
  @media screen and (min-width: 1024px) {
    left: ${({ teamColor }) => (teamColor === 'BLUE' ? '129px' : '665px')};
  }
  li {
    display: flex;
    flex-direction: column;
    align-items: ${({ teamColor }) => (teamColor === 'BLUE' ? 'flex-start' : 'flex-end')};
    justify-content: space-between;
    &:nth-child(4) {
      margin-top: 19px;
    }
  }
  div:nth-child(4) {
    margin-top: 19px;
  }
`;
const LoaderWrapper = styled.div`
  position: relative;
  padding: 6px;
  width: 160px;
  @media screen and (min-width: 786px) {
    width: 196px;
  }
  height: 66px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PlayerWrapper = styled.li`
  position: relative;
  padding: 6px;
  width: 160px;
  @media screen and (min-width: 786px) {
    width: 196px;
  }
  height: 66px;
  color: #fff;
  overflow: hidden;
`;
const PlayerName = styled.div`
  font-size: 160%;
`;
const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 140%;
`;
const PlayerTier = styled.img`
  height: 24px;
`;

const Result = () => {
  const players = useRecoilValue(playersAtom);
  return (
    <>
      <Team color="BLUE" players={players.slice(0, 5)} />
      <Team color="RED" players={players.slice(5)} />
    </>
  );
};

type TTeam = {
  color: 'RED' | 'BLUE';
  players: Array<TEntry>;
};

const Team = ({ color, players }: TTeam) => (
  <TeamWrapper teamColor={color}>
    {players.map((player) => (
      <Suspense key={player.id} fallback={<Loader />}>
        <Player key={player.id} id={player.value} />
      </Suspense>
    ))}
  </TeamWrapper>
);

const Player = ({ id }: { id: string }) => {
  const { name, tier, rank, leaguePoints } = useRecoilValue(infoSelector(id));
  return (
    <PlayerWrapper>
      <PlayerName>{name}</PlayerName>
      <PlayerInfo>
        <PlayerTier src={`assets/${tier}.png`} />
        &nbsp;{`- ${rank} - ${leaguePoints}`}
      </PlayerInfo>
    </PlayerWrapper>
  );
};

const Loader = () => (
  <LoaderWrapper>
    <PulseLoader size={12} margin={4} color="#888" />
  </LoaderWrapper>
);

export default Result;
