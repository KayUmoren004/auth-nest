import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFixtureDto, EditFixtureResultsDto } from './dto/fixture.dto';

@Injectable()
export class FixtureService {
  constructor(private prisma: PrismaService) {}

  // Create a new fixture
  async createFixture(dto: CreateFixtureDto) {
    // Get the home team
    const homeTeam = await this.prisma.team.findUnique({
      where: { id: dto.homeId },
    });

    // Get the away team
    const awayTeam = await this.prisma.team.findUnique({
      where: { id: dto.awayId },
    });

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
        results: null,
        date: dto.date,
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
        results: {
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
    return await this.prisma.fixtures.findUnique({
      where: { id },
      include: {
        homeTeam: true,
        awayTeam: true,
        results: true,
      },
    });
  }
}
