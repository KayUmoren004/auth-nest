import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateGameDto } from './dto/game.dto';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

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
        fixture: true,
      },
    });

    if (!game) throw new NotFoundException('Game does not exist');

    // Return the game
    return game;
  }
}
