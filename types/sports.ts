export type Soccer = {
  goals: number;
  assists: number;
  shotsOnGoal: number;
  saves: number;
  foulsCommitted: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
};

export type Basketball = {
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fieldGoalPercentage: number;
};

export type Football = {
  passingYards: number;
  rushingYards: number;
  receivingYards: number;
  tackles: number;
  sacks: number;
  interceptions: number;
  touchdowns: number;
};

export type Baseball = {
  battingAverage: number;
  homeRuns: number;
  RBIs: number; // Runs Batted In
  stolenBases: number;
  ERA: number; // Earned Run Average for pitchers
  strikeouts: number;
};

export type Volleyball = {
  kills: number;
  assists: number;
  blocks: number;
  serviceAces: number;
  digs: number;
  hittingPercentage: number;
};

export type Hockey = {
  goalsScored: number;
  assists: number;
  saves: number; // for goalkeepers
  penaltyMinutes: number;
  plusMinusRating: number;
  shotsOnGoal: number;
};

export type Tennis = {
  aces: number;
  doubleFaults: number;
  firstServePercentage: number;
  breakPointsWon: number;
  winners: number;
  unforcedErrors: number;
};

export type Golf = {
  strokeAverage: number;
  drivingDistance: number;
  fairwayAccuracy: number;
  greensInRegulation: number;
  puttsPerRound: number;
  eaglesBirdiesMade: number;
};

export type Swimming = {
  bestTimes: { [event: string]: string }; // Best times per event
  medalsTitlesWon: number;
  worldRankings: number;
  personalBests: { [event: string]: string };
  strokeEfficiency: number;
};

export type Track = {
  personalBests: { [event: string]: string };
  medalsTitlesWon: number;
  qualifyingTimes: { [event: string]: string };
  worldRankings: number;
  eventSpecificStats: { [event: string]: number };
};

export type CrossCountry = {
  personalBests: string;
  averageFinishPlace: number;
  medalsTitlesWon: number;
  teamPointsContributed: number;
  courseRecords: { [course: string]: string };
};

export type Wrestling = {
  wins: number;
  losses: number;
  pins: number;
  technicalFalls: number;
  majorDecisions: number;
  takedownRatio: number;
};

export type Lacrosse = {
  goalsScored: number;
  assists: number;
  groundBalls: number;
  faceoffWins: number;
  saves: number; // for goalkeepers
  turnovers: number;
};

export type Softball = {
  battingAverage: number;
  homeRuns: number;
  RBIs: number;
  stolenBases: number;
  ERA: number; // Earned Run Average for pitchers
  strikeouts: number;
};

export type Pickleball = {
  pointsScored: number;
  gamesWon: number;
  serveAccuracy: number;
  unforcedErrors: number;
  aces: number;
};

export type PingPong = {
  pointsScored: number;
  gamesWon: number;
  serveAccuracy: number;
  smashSuccessRate: number;
  errorRate: number;
};

export type Badminton = {
  pointsScored: number;
  gamesWon: number;
  smashSuccessRate: number;
  netPlaySuccess: number;
  unforcedErrors: number;
};

export type PassPuntKick = {
  passingAccuracy: number;
  puntingDistance: number;
  kickingAccuracy: number;
  totalPointsScored: number;
};

export type sportStats =
  | Soccer
  | Basketball
  | Football
  | Baseball
  | Volleyball
  | Hockey
  | Tennis
  | Golf
  | Swimming
  | Track
  | CrossCountry
  | Wrestling
  | Lacrosse
  | Softball
  | Pickleball
  | PingPong
  | Badminton
  | PassPuntKick;
