import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFixtureDto, EditFixtureResultsDto } from './dto/fixture.dto';
import { GameService } from 'src/game/game.service';
import { CreateGameDto } from 'src/game/dto/game.dto';
import { TeamService } from 'src/team/team.service';

@Injectable()
export class FixtureService {
  constructor(
    private prisma: PrismaService,
    private gameService: GameService,
    private teamService: TeamService,
  ) {}

  // Create a new fixture
  async createFixture(dto: CreateFixtureDto) {
    // Get the home team
    const homeTeam = await this.teamService.findOne(dto.homeId);

    // Get the away team
    const awayTeam = await this.teamService.findOne(dto.awayId);

    // If home team or away team does not exist, throw an error
    if (!homeTeam || !awayTeam) throw new Error('Team does not exist');

    let homeTeamType = await this.prisma.homeTeamType.findUnique({
      where: { homeTeamId: homeTeam.id },
    });
    let awayTeamType = await this.prisma.awayTeamType.findUnique({
      where: { awayTeamId: awayTeam.id },
    });

    if (!homeTeamType) {
      // Create HomeTeamType if it doesn't exist
      homeTeamType = await this.prisma.homeTeamType.create({
        data: {
          name: homeTeam.name,
          logo: homeTeam.logoUrl,
          homeTeamId: homeTeam.id,
          type: 'Home',
        },
      });
    }
    if (!awayTeamType) {
      // Create AwayTeamType if it doesn't exist
      awayTeamType = await this.prisma.awayTeamType.create({
        data: {
          name: awayTeam.name,
          logo: awayTeam.logoUrl,
          awayTeamId: awayTeam.id,
          type: 'Away',
        },
      });
    }

    // Create Game DTO
    const gameDto: CreateGameDto = {
      homeId: homeTeam.id,
      awayId: awayTeam.id,
      leagueId: dto.leagueId,
    };

    // Create the game
    const game = await this.gameService.createGame(gameDto);

    // If game does not exist, throw an error
    if (!game) throw new Error('Game does not exist');

    // Create the fixture
    const fixture = await this.prisma.fixtures.create({
      data: {
        homeTeam: {
          connect: {
            id: homeTeamType.id,
          },
        },
        awayTeam: {
          connect: {
            id: awayTeamType.id,
          },
        },
        date: dto.date,
        league: {
          connect: {
            id: dto.leagueId,
          },
        },
        game: {
          connect: {
            id: game.id,
          },
        },
      },
    });

    // Update the game with the fixture
    await this.gameService.updateGameWithFixture(game.id, fixture.id);

    // Add the fixture to the league
    await this.prisma.league.update({
      where: { id: dto.leagueId },
      data: {
        fixtures: {
          connect: {
            id: fixture.id,
          },
        },
      },
    });

    // Return the fixture
    return fixture;
  }

  // Edit a fixture's result
  async editFixtureResults(dto: EditFixtureResultsDto) {
    const { homeScore, awayScore, winner, fixtureId } = dto;

    // Get the fixture
    const fixture = await this.prisma.fixtures.findUnique({
      where: { id: fixtureId },
      include: {
        homeTeam: true,
        awayTeam: true,
      },
    });

    // If fixture does not exist, throw an error
    if (!fixture) throw new Error('Fixture does not exist');

    // Create a new result
    const result = await this.prisma.results.create({
      data: {
        homeScore,
        awayScore,
        winner,
        fixtures: {
          connect: {
            id: fixture.id,
          },
        },
        homeId: fixture.homeTeam.id,
        awayId: fixture.awayTeam.id,
      },
    });

    // Update the fixture with the new result
    await this.prisma.fixtures.update({
      where: { id: fixture.id },
      data: {
        result: {
          connect: {
            id: result.id,
          },
        },
      },
    });

    // Return the result and fixture
    return result;
  }

  // Find a fixture by id
  async findFixtureById(id: string) {
    const fixture = await this.prisma.fixtures.findUnique({
      where: { id },
      include: {
        homeTeam: true,
        awayTeam: true,
        result: true,
      },
    });

    // If fixture does not exist, throw an error
    if (!fixture) throw new Error('Fixture does not exist');

    // Return the fixture
    return fixture;
  }

  // Get All Fixtures in a League
  async getAllFixturesInLeague(leagueId: string) {
    const fixtures = await this.prisma.fixtures.findMany({
      where: { leagueId },
      include: {
        homeTeam: {
          include: {
            team: true,
          },
        },
        awayTeam: {
          include: {
            team: true,
          },
        },
        result: true,
      },
    });

    // Return the fixtures
    return fixtures;
  }
}
