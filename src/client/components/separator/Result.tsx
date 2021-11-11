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
  const mockPlayers = [];
  return (
    <>
      <Team color="BLUE" players={mockPlayers} />
      <Team color="RED" players={mockPlayers} />
    </>
  );
};

enum ETier {
  unranked = 'UNRANKED',
  bronze = 'BRONZE',
  silver = 'SILVER',
  gold = 'GOLD',
  platinum = 'PLATINUM',
  diamond = 'DIAMOND',
  master = 'MASTER',
  grandmaster = 'GRANDMASTER',
  challenger = 'CHALLENGER',
}

type TPlayer = {
  name: string;
  tier: ETier;
  rank: 'I' | 'II' | 'III' | 'IV';
  leaguepoints: number;
};

type TTeam = {
  color: 'RED' | 'BLUE';
  players: Array<TPlayer>;
};

const Team = ({ color, players }: TTeam) => {
  return (
    <TeamWrapper teamColor={color}>
      <Player />
      <Player />
      <Player />
      <Player />
      <Player />
    </TeamWrapper>
  );
};

const Player = () => {
  return (
    <PlayerWrapper>
      <PlayerName>가나다</PlayerName>
      <PlayerInfo>
        <PlayerTier src={require(`client/images/CHALLENGER.png`).default} />
        &nbsp;- II - 89
      </PlayerInfo>
    </PlayerWrapper>
  );
};

export default Result;
