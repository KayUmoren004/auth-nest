import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StandingData } from './dto/standings.dto';
import { LeagueService } from 'src/league/league.service';

@Injectable()
export class StandingsService {
  constructor(private prisma: PrismaService) {}

  async setupLeagueTable(leagueId: string): Promise<void> {
    // Get all the teams in the league and sort alphabetically
    const teams = await this.prisma.team.findMany({
      where: { leagueId: leagueId },
      orderBy: { name: 'asc' },
    });

    // Iterate through the teams to create or update the soccer table
    for (const team of teams) {
      const existingTableEntry = await this.prisma.soccerTable.findUnique({
        where: { teamId: team.id },
      });

      if (!existingTableEntry) {
        // If the team is not in the table, create a new entry
        await this.prisma.soccerTable.create({
          data: {
            teamId: team.id,
            leagueId: leagueId,
            // Set initial values
            played: 0,
            wins: 0,
            draws: 0,
            loss: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            goalDifference: 0,
            points: 0,
            position: 0, // Temporary value, to be updated later
          },
        });
      }
    }

    // Update positions in the soccer table after adding new teams
    await this.updatePositions(leagueId);
  }

  private async updatePositions(leagueId: string): Promise<void> {
    // Get all entries in the soccer table for this league, sorted by team name
    const tableEntries = await this.prisma.soccerTable.findMany({
      where: { leagueId: leagueId },
      orderBy: {
        team: {
          name: 'asc',
        },
      },
      include: {
        team: true,
      },
    });

    // Update the position based on alphabetical order
    for (let i = 0; i < tableEntries.length; i++) {
      await this.prisma.soccerTable.update({
        where: { id: tableEntries[i].id },
        data: { position: i + 1 },
      });
    }
  }

  async updateStandings(matchResult: StandingData): Promise<void> {
    // Update individual team standings
    await this.updateTeamStandings(
      matchResult.homeTeamId,
      matchResult.result.homeScore,
      matchResult.result.awayScore,
      matchResult.result.winner === 'Home',
    );
    await this.updateTeamStandings(
      matchResult.awayTeamId,
      matchResult.result.awayScore,
      matchResult.result.homeScore,
      matchResult.result.winner === 'Away',
    );

    // Reorder the league standings
    await this.reorderLeagueStandings(matchResult.leagueId);
  }

  private async updateTeamStandings(
    teamId: string,
    goalsFor: number,
    goalsAgainst: number,
    isWinner: boolean,
  ): Promise<void> {
    const teamStandings = await this.prisma.soccerTable.findUnique({
      where: { teamId: teamId },
    });

    if (!teamStandings) {
      // Handle the case where standings are not found for the team
      return;
    }

    // Calculate updated standings
    let points = 0;
    let wins = 0;
    let draws = 0;
    let losses = 0;

    if (isWinner) {
      points = 3;
      wins = 1;
    } else if (goalsFor === goalsAgainst) {
      points = 1;
      draws = 1;
    } else {
      losses = 1;
    }

    await this.prisma.soccerTable.update({
      where: { teamId: teamId },
      data: {
        played: teamStandings.played + 1,
        wins: teamStandings.wins + wins,
        draws: teamStandings.draws + draws,
        loss: teamStandings.loss + losses,
        goalsFor: teamStandings.goalsFor + goalsFor,
        goalsAgainst: teamStandings.goalsAgainst + goalsAgainst,
        goalDifference:
          teamStandings.goalDifference + (goalsFor - goalsAgainst),
        points: teamStandings.points + points,
      },
    });
  }

  private async compareTeams(teamA, teamB, leagueId: string) {
    // Compare by points
    if (teamA.points !== teamB.points) {
      return teamB.points - teamA.points;
    }

    // Compare by goal difference
    if (teamA.goalDifference !== teamB.goalDifference) {
      return teamB.goalDifference - teamA.goalDifference;
    }

    // Head-to-Head Comparison
    const headToHeadResult = await this.calculateHeadToHeadResult(
      teamA.id,
      teamB.id,
      leagueId,
    );
    if (headToHeadResult !== 0) {
      return headToHeadResult;
    }

    return 0; // Equal ranking if all criteria are the same
  }

  private async reorderLeagueStandings(leagueId: string): Promise<void> {
    const standings = await this.prisma.soccerTable.findMany({
      where: { leagueId: leagueId },
    });

    // Sort the standings based on the criteria: Points, Goal Difference, and Head-to-Head
    for (let i = 0; i < standings.length; i++) {
      for (let j = i + 1; j < standings.length; j++) {
        const comparisonResult = await this.compareTeams(
          standings[i],
          standings[j],
          leagueId,
        );
        if (comparisonResult > 0) {
          const temp = standings[i];
          standings[i] = standings[j];
          standings[j] = temp;
        }
      }
    }

    // Update positions in the database
    for (let position = 0; position < standings.length; position++) {
      await this.prisma.soccerTable.update({
        where: { id: standings[position].id },
        data: { position: position + 1 },
      });
    }
  }

  // Function to calculate head-to-head result between two teams
  private async calculateHeadToHeadResult(
    teamAId: string,
    teamBId: string,
    leagueId: string,
  ): Promise<number> {
    // Fetch head-to-head matches from the database
    const matches = await this.prisma.game.findMany({
      where: {
        leagueId: leagueId,
        AND: [
          { teams: { some: { id: teamAId } } },
          { teams: { some: { id: teamBId } } },
        ],
      },
      include: {
        fixture: {
          include: {
            result: true,
          },
        },
      },
    });

    let teamAGoals = 0;
    let teamBGoals = 0;

    // Calculate total goals for each team in their head-to-head matches
    matches.forEach((match) => {
      // match.fixture.result.forEach((result) => {
      //   if (result.homeId === teamAId) {
      //     teamAGoals += result.homeScore;
      //     teamBGoals += result.awayScore;
      //   } else if (result.awayId === teamAId) {
      //     teamAGoals += result.awayScore;
      //     teamBGoals += result.homeScore;
      //   }
      // });

      if (match.fixture.result.homeId === teamAId) {
        teamAGoals += match.fixture.result.homeScore;
        teamBGoals += match.fixture.result.awayScore;
      } else if (match.fixture.result.awayId === teamAId) {
        teamAGoals += match.fixture.result.awayScore;
        teamBGoals += match.fixture.result.homeScore;
      }
    });

    // Compare based on total goals scored in head-to-head matches
    if (teamAGoals !== teamBGoals) {
      return teamBGoals - teamAGoals;
    }

    return 0; // Equal head-to-head record
  }
}
