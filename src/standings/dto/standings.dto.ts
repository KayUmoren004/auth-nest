export type StandingData = {
  homeTeamId: string;
  awayTeamId: string;
  sportTypeId: string;
  sportType: string;
  leagueId: string;
  result: {
    homeScore: number;
    awayScore: number;
    winner: 'Home' | 'Away' | 'Draw';
  };
};
