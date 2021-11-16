export enum ETier {
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

export type TLeagueInfo = {
  leagueId: string;
  queueType: 'RANKED_FLEX_SR' | 'RANKED_SOLO_5x5';
  tier: ETier;
  rank: 'I' | 'II' | 'III' | 'IV';
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
};

export type TPlayer = {
  name: string;
  tier: ETier;
  rank: 'I' | 'II' | 'III' | 'IV';
  leaguePoints: number;
};
