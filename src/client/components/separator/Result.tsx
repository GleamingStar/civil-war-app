import { playersAtom } from 'client/config/atom';
import { useRecoilValue } from 'recoil';
import { TPlayer } from 'shared/types';
import styled from 'styled-components';

const TeamWrapper = styled.ul<{ teamColor: 'BLUE' | 'RED' }>`
  position: absolute;
  top: 121px;
  left: ${({ teamColor }) => (teamColor === 'BLUE' ? '129px' : '661px')};
  li {
    display: flex;
    flex-direction: column;
    align-items: ${({ teamColor }) => (teamColor === 'BLUE' ? 'flex-start' : 'flex-end')};
    justify-content: space-between;
    &:nth-child(4) {
      margin-top: 19px;
    }
  }
`;
const PlayerWrapper = styled.li`
  position: relative;
  padding: 6px;
  width: 200px;
  height: 66px;
  color: #fff;
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
  players: Array<TPlayer>;
};

const Team = ({ color, players }: TTeam) => (
  <TeamWrapper teamColor={color}>
    {players.map((player) => (
      <Player key={player.name} info={player} />
    ))}
  </TeamWrapper>
);

const Player = ({ info }: { info: TPlayer }) => {
  const { name, tier, rank, leaguePoints } = info;
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

export default Result;
