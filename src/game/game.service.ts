import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateGameDto, GameAttendanceDto } from './dto/game.dto';
import { TeamService } from 'src/team/team.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GameService {
  constructor(
    private prisma: PrismaService,
    private teamService: TeamService,
  ) {}

  // Create a new game
  async createGame(dto: CreateGameDto) {
    const { homeId, awayId, leagueId } = dto;

    const league = await this.prisma.league.findUnique({
      where: { id: leagueId },
    });

    const [homeTeam, awayTeam] = await Promise.all([
      this.prisma.team.findUnique({
        where: { id: homeId },
      }),
      this.prisma.team.findUnique({
        where: { id: awayId },
      }),
    ]);

    if (!league) throw new Error('League does not exist');
    if (!homeTeam || !awayTeam) throw new Error('Team does not exist');

    // Get Players for the teams
    const [homePlayers, awayPlayers] = await Promise.all([
      this.teamService.findPlayers(homeId),
      this.teamService.findPlayers(awayId),
    ]);

    // Construct the roster object
    const roster = {
      home: homePlayers,
      away: awayPlayers,
    } as any;

    // Create the game
    const game = await this.prisma.game.create({
      data: {
        teams: {
          connect: [
            {
              id: homeId,
            },
            {
              id: awayId,
            },
          ],
        },
        league: {
          connect: {
            id: leagueId,
          },
        },
        homeId,
        awayId,
        roster: roster,
      },
    });

    // Return the game
    return game;
  }

  // Update the game with the fixture
  async updateGameWithFixture(gameId: string, fixtureId: string) {
    // Update the game with the fixture
    const game = await this.prisma.game.update({
      where: { id: gameId },
      data: {
        fixture: {
          connect: {
            id: fixtureId,
          },
        },
      },
    });

    // Return the game
    return game;
  }

  // Get a game by ID
  async findGameById(gameId: string) {
    // Find the game by ID
    const game = await this.prisma.game.findUnique({
      where: { id: gameId },
      include: {
        teams: true,
        league: true,
        fixture: {
          include: {
            homeTeam: true,
            awayTeam: true,
          },
        },
        // roster: true,
        attendance: true,
      },
    });

    if (!game) throw new NotFoundException('Game does not exist');

    // Return the game
    return game;
  }

  // Modify Game Attendance
  async addAttendance(dto: GameAttendanceDto) {
    const { gameId, attendance } = dto;

    // Find the game
    const game = await this.prisma.game.findUnique({
      where: { id: gameId },
    });

    if (!game) throw new NotFoundException('Game does not exist');

    console.log(attendance);

    const gameHomeId = game.homeId;
    const gameAwayId = game.awayId;

    // Find the home team in the attendance
    const homeTeam = attendance.find((team) => team.teamId === gameHomeId);
    const awayTeam = attendance.find((team) => team.teamId === gameAwayId);

    if (!homeTeam || !awayTeam) throw new Error('Invalid attendance data');

    // Create the attendance for home team
    await Promise.all(
      homeTeam.players.map(async (playerId) => {
        await this.prisma.gameAttendance.create({
          data: {
            game: {
              connect: {
                id: gameId,
              },
            },
            player: {
              connect: {
                id: playerId,
              },
            },
            team: {
              connect: {
                id: gameHomeId,
              },
            },
            attended: true,
            gameId,
          },
        });
      }),
    );

    // Create the attendance for away team
    await Promise.all(
      awayTeam.players.map(async (playerId) => {
        await this.prisma.gameAttendance.create({
          data: {
            game: {
              connect: {
                id: gameId,
              },
            },
            player: {
              connect: {
                id: playerId,
              },
            },
            team: {
              connect: {
                id: gameAwayId,
              },
            },
            attended: true,
            gameId,
          },
        });
      }),
    );

    // Create an attendance  for the rest of the players from the home team and away team not in the attendance list
    const homePlayers = await this.teamService.findPlayers(gameHomeId);
    const awayPlayers = await this.teamService.findPlayers(gameAwayId);

    const homePlayersIds = homePlayers.map((player) => player.id);
    const awayPlayersIds = awayPlayers.map((player) => player.id);

    const homePlayersNotInAttendance = homePlayersIds.filter(
      (playerId) => !homeTeam.players.includes(playerId),
    );

    const awayPlayersNotInAttendance = awayPlayersIds.filter(
      (playerId) => !awayTeam.players.includes(playerId),
    );

    // Create the attendance for home team
    await Promise.all(
      homePlayersNotInAttendance.map(async (playerId) => {
        await this.prisma.gameAttendance.create({
          data: {
            game: {
              connect: {
                id: gameId,
              },
            },
            player: {
              connect: {
                id: playerId,
              },
            },
            team: {
              connect: {
                id: gameHomeId,
              },
            },
            attended: false,
            gameId,
          },
        });
      }),
    );

    // Create the attendance for away team
    await Promise.all(
      awayPlayersNotInAttendance.map(async (playerId) => {
        await this.prisma.gameAttendance.create({
          data: {
            game: {
              connect: {
                id: gameId,
              },
            },
            player: {
              connect: {
                id: playerId,
              },
            },
            team: {
              connect: {
                id: gameAwayId,
              },
            },
            attended: false,
            gameId,
          },
        });
      }),
    );

    // Add all the attendance to the game
    const gameAttendance = await this.prisma.gameAttendance.findMany({
      where: {
        gameId,
      },
    });

    // Return the attendance
    return gameAttendance;
  }
}
