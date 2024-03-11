import { sportStats } from './sports';

export type School = {
  id: string;
  name: string;
  location: string;
  logoUrl: string;
  establishedDate: Date;
  contact: {
    id: string;
    phone: string;
    email: string;
    // address: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
  admins?: string[];
  domain: {
    id: string;
    createdAt: string;
    updatedAt: string;
    domain: string;
    slug: string;
    schoolId: string;
  };
  slug: string;
};

export type Sport = {
  id: string;
  schoolId: string; // Reference to associated school
  name: string;
  season: 'Fall' | 'Winter' | 'Spring' | 'Summer' | string;
  description: string; // Brief description of the sport
  rulesUrl: string; // URL link to official rules (if any)
  leagues: League[]; // List of leagues associated with the sport
  status: 'Active' | 'Inactive' | 'Canceled';
};

export type League = {
  id: string;
  sportId: string; // Reference to associated sport
  name: string;
  division: string;
  startDate: Date;
  endDate: Date;
  sport: Sport;
  fixtures: Fixture[]; // List of fixtures associated with the league
};

export type Team = {
  id: string;
  leagueId: string; // Reference to associated league
  name: string;
  captainId: string;
  logoUrl: string;
  wins: number; // Number of victories
  losses: number; // Number of defeats
  ties: number; // Number of draws (relevant for sports like soccer)
  captain: User;
  league: League;
  fixtures: Fixture[]; // List of fixtures associated with the team
  // fixturesIds: string[]; // List of fixture IDs associated with the team
  shortName?: string;
};

export type Player = {
  id: string;
  teamId: string; // Reference to associated team
  userId: string; // Reference to associated user profile
  name: string;
  email: string;
  position: string;
  jerseyNumber: number;
  stats: any; // Player stats
};

export type Game = {
  id: string;
  homeTeamId: string; // ID reference to the home team
  awayTeamId: string; // ID reference to the away team
  date: Date; // Scheduled date for the game
  location: string; // Venue of the game
  result?: {
    homeScore: number;
    awayScore: number;
    winner: 'Home' | 'Away' | 'Draw';
  };
  fixtureId: string; // Reference to the fixture
  fixture: Fixture;
};

export type HomeTeamType = {
  id: string;
  logo: string;
  name: string;
  homeTeamId: string;
  team: Team;
  type: 'Home';
  fixtures: Fixture[];
};

export type AwayTeamType = {
  id: string;
  logo: string;
  name: string;
  awayTeamId: string;
  team: Team;
  type: 'Away';
  fixtures: Fixture[];
};

// Result Type
export type Results = {
  id: string;
  homeId: string;
  awayId: string;
  winner: 'Home' | 'Away' | 'Draw';
  homeScore: number;
  awayScore: number;
  fixtures: Fixture[];
};

export type Fixture = {
  id: string;
  homeTeam: HomeTeamType;
  awayTeam: AwayTeamType;
  results: Results;
  resultsId: string;
  homeFixtureId: string;
  awayFixtureId: string;
  date: Date;
};

type DynamicStats = {
  [key: string]: number | string | boolean | sportStats; // This allows for various types of statistics like counts, labels, or binary states.
};

// Represents statistics for a specific game.
export type GameStats = {
  gameId: string; // Reference to the game ID
  stats: DynamicStats;
};

// Represents individual stats for a player across games.
export type PlayerStats = {
  playerId: string;
  stats: DynamicStats[];
};

// Represents stats for a team across a season or several games.
export type TeamStats = {
  teamId: string;
  stats: DynamicStats;
};

// Represents overall statistics for a season across all teams and games.
export type SeasonStats = {
  seasonId: string;
  stats: DynamicStats;
};

// Represents a team's statistics within a specific season.
export type SeasonTeamStats = {
  seasonId: string;
  teamId: string;
  stats: DynamicStats;
};

// Represents an individual player's statistics within a specific season.
export type SeasonPlayerStats = {
  seasonId: string;
  playerId: string;
  stats: DynamicStats;
};

// Represents stats for a particular game within a season.
export type SeasonGameStats = {
  seasonId: string;
  gameId: string;
  stats: DynamicStats;
};

export type User = {
  uid: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'CLIENT';
  createdAt: string;
  updatedAt: string;
  bio: string;
  emailVerified: boolean;
  username: string;
  signUpDate: Date;
  lastLogin: Date;
  schoolId: string;
  schoolDomain: string;
  [key: string]: any;
};
