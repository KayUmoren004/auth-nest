export type headers = {
  [key: string]: sportheaders[];
};

export type soccertable = {
  Team: string;
  stats: {
    GP: number;
    W: number;
    T: number;
    L: number;
    '+/-': string;
    GD: number;
    PTS: number;
  };
  Form: string;
};

export type sportteam = {
  [key: string]: any;
};

export type sportheaders = {
  name: string;
  shorthand: string;
  main?: boolean;
};

export type sporttable = {
  headers: sportheaders[];
  teams: sportteam[];
};

export const sportHeaders: headers = {
  soccer: [
    {
      name: 'Position',
      shorthand: 'POS',
      main: true,
    },
    {
      name: 'Team',
      shorthand: 'TEAM',
      main: true,
    },
    {
      name: 'Games Played',
      shorthand: 'GP',
    },
    {
      name: 'Wins',
      shorthand: 'W',
    },
    {
      name: 'Ties',
      shorthand: 'T',
    },
    {
      name: 'Losses',
      shorthand: 'L',
    },
    // {
    //   name: "Goal Differential",
    //   shorthand: "+/-",
    // },
    {
      name: 'Goal Difference',
      shorthand: 'GD',
    },
    {
      name: 'Points',
      shorthand: 'PTS',
    },
    {
      name: 'Form',
      shorthand: 'Form',
    },
  ],
  basketball: [
    {
      name: 'Position',
      shorthand: 'POS',
      main: true,
    },
    {
      name: 'Team',
      shorthand: 'TEAM',
      main: true,
    },
    {
      name: 'Games Played',
      shorthand: 'GP',
    },
    {
      name: 'Wins',
      shorthand: 'W',
    },
    {
      name: 'Losses',
      shorthand: 'L',
    },
    {
      name: 'Win %',
      shorthand: '%',
    },
  ],
  football: [],
  baseball: [],
  volleyball: [
    {
      name: 'Position',
      shorthand: 'POS',
      main: true,
    },
    {
      name: 'Team',
      shorthand: 'TEAM',
      main: true,
    },
    {
      name: 'Games Played',
      shorthand: 'GP',
    },
    {
      name: 'Wins',
      shorthand: 'W',
    },
    {
      name: 'Losses',
      shorthand: 'L',
    },
  ],
  hockey: [],
  tennis: [],
  golf: [],
  swimming: [],
  track: [],
  crossCountry: [],
  wrestling: [],
  lacrosse: [],
  softball: [],
  pickleball: [],
  pingPong: [],
  badminton: [],
  passPuntKick: [],
};

export const soccerTeams: sportteam[] = [
  {
    position: 1,
    Team: 'FC Awesome',
    stats: {
      GP: 10,
      W: 6,
      T: 2,
      L: 2,
      // "+/-": "20-10",
      GD: 10,
      PTS: 20,
    },
    Form: 'W-L-W-W-T',
  },
  {
    position: 2,
    Team: 'Eagles United',
    stats: {
      GP: 10,
      W: 5,
      T: 3,
      L: 2,
      // "+/-": "10-5",
      GD: 5,
      PTS: 18,
    },
    Form: 'W-T-L-W-T',
  },
  {
    position: 3,
    Team: 'River City',
    stats: {
      GP: 10,
      W: 3,
      T: 4,
      L: 3,
      // "+/-": "1-3",
      GD: -1,
      PTS: 13,
    },
    Form: 'T-T-W-L-T',
  },
  {
    position: 4,
    Team: 'Mountain Rovers',
    stats: {
      GP: 10,
      W: 2,
      T: 5,
      L: 3,
      // "+/-": "10-10",
      GD: 0,
      PTS: 11,
    },
    Form: 'T-T-T-W-L',
  },
  {
    position: 5,
    Team: 'Seaside FC',
    stats: {
      GP: 10,
      W: 1,
      T: 6,
      L: 3,
      // "+/-": "2-5",
      GD: -3,
      PTS: 9,
    },

    Form: 'L-T-T-T-T',
  },
];

export const basketballTeams: sportteam[] = [
  {
    position: 1,
    Team: 'FC Awesome',
    stats: {
      GP: 10,
      W: 6,
      L: 4,
      '%': 0.6,
    },
  },
  {
    position: 2,
    Team: 'Eagles United',
    stats: {
      GP: 10,
      W: 5,
      L: 5,
      '%': 0.5,
    },
  },
  {
    position: 3,
    Team: 'River City',
    stats: {
      GP: 10,
      W: 3,
      L: 7,
      '%': 0.3,
    },
  },
  {
    position: 4,
    Team: 'Mountain Rovers',
    stats: {
      GP: 10,
      W: 2,
      L: 8,
      '%': 0.2,
    },
  },
  {
    position: 5,
    Team: 'Seaside FC',
    stats: {
      GP: 10,
      W: 1,
      L: 9,
      '%': 0.1,
    },
  },
];

export const volleyballTeams: sportteam[] = [
  {
    position: 1,
    Team: 'FC Awesome',
    stats: {
      GP: 10,
      W: 6,
      L: 4,
    },
  },
  {
    position: 2,
    Team: 'Eagles United',
    stats: {
      GP: 10,
      W: 5,
      L: 5,
    },
  },
  {
    position: 3,
    Team: 'River City',
    stats: {
      GP: 10,
      W: 3,
      L: 7,
    },
  },
  {
    position: 4,
    Team: 'Mountain Rovers',
    stats: {
      GP: 10,
      W: 2,
      L: 8,
    },
  },
  {
    position: 5,
    Team: 'Seaside FC',
    stats: {
      GP: 10,
      W: 1,
      L: 9,
    },
  },
];
