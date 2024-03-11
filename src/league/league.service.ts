import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateLeagueDto, SettingDto, UpdateLeagueDto } from './dto/league.dto';

@Injectable()
export class LeagueService {
  constructor(private prisma: PrismaService) {}

  // Create a new league
  async createLeague(dto: CreateLeagueDto) {
    // Check if league exists
    const league = await this.prisma.league.findUnique({
      where: { name: dto.name },
    });

    // If league exists, throw an error
    if (league) throw new ConflictException('League already exists');

    // If sport does not exist, throw an error
    const sport = await this.prisma.sport.findUnique({
      where: { id: dto.sportId },
    });

    if (!sport) throw new ConflictException('Sport does not exist');

    // Create the league
    const newLeague = await this.prisma.league.create({
      data: {
        sportId: dto.sportId,
        name: dto.name,
        division: dto.division,
        startDate: dto.startDate,
        endDate: dto.endDate,
      },
    });

    // Return the league
    return newLeague;
  }

  // Return all leagues given a sport id
  async findAll(sportId: string) {
    return await this.prisma.league.findMany({
      where: { sportId },
      include: {
        teams: true,
      },
    });
  }

  // Return all leagues given a school id
  async findAllBySchool(schoolId: string) {
    const sports = await this.prisma.sport.findMany({
      where: { schoolId },
    });

    const leagues = await this.prisma.league.findMany({
      where: {
        sportId: {
          in: sports.map((sport) => sport.id),
        },
      },
      include: {
        teams: true,
      },
    });

    return leagues;
  }

  // Delete a league given a league id and sport id
  async deleteLeague(leagueId: string, sportId: string) {
    // Check if league exists
    const league = await this.prisma.league.findUnique({
      where: { id: leagueId },
    });

    // If league does not exist, throw an error
    if (!league) throw new ConflictException('League does not exist');

    // Check if league belongs to sport
    if (league.sportId !== sportId)
      throw new ConflictException('League does not belong to sport');

    // Delete the league
    await this.prisma.league.delete({
      where: { id: leagueId },
    });
  }

  // Update a league given a league id and sport id
  async updateLeague(leagueId: string, sportId: string, dto: UpdateLeagueDto) {
    // Check if league exists
    const league = await this.prisma.league.findUnique({
      where: { id: leagueId },
    });

    // If league does not exist, throw an error
    if (!league) throw new ConflictException('League does not exist');

    // Check if league belongs to sport
    if (league.sportId !== sportId)
      throw new ConflictException('League does not belong to sport');

    // Update the league
    const updatedLeague = await this.prisma.league.update({
      where: { id: leagueId },
      data: {
        name: dto.name ? dto.name : league.name,
        division: dto.division ? dto.division : league.division,
        startDate: dto.startDate ? dto.startDate : league.startDate,
        endDate: dto.endDate ? dto.endDate : league.endDate,
      },
    });

    // Return the league
    return updatedLeague;
  }

  // Return league given a league id
  async findOne(leagueId: string) {
    return await this.prisma.league.findUnique({
      where: { id: leagueId },
      include: {
        sport: true,
        settings: true,
        teams: {
          include: {
            captain: true,
          },
        },
        soccerTable: {
          include: {
            team: true,
          },
        },
      },
    });
  }

  // Update a league's settings given a sport id and league id
  async updateLeagueSettings(
    leagueId: string,
    sportId: string,
    dto: SettingDto[],
  ) {
    // Check if league exists
    const league = await this.prisma.league.findUnique({
      where: { id: leagueId },
    });

    // If league does not exist, throw an error
    if (!league) throw new ConflictException('League does not exist');

    // Check if league belongs to sport
    if (league.sportId !== sportId)
      throw new ConflictException('League does not belong to sport');

    // Update each setting in the settings array
    for (const setting of dto) {
      const id = setting.id;
      const name = setting.name;

      if (id && name) {
        await this.prisma.leagueSettings.update({
          where: { id, name },
          data: {
            name: setting.name,
            value: setting.value,
            required: Boolean(setting.required),
          },
        });
      } else {
        await this.prisma.leagueSettings.create({
          data: {
            name: setting.name,
            value: setting.value,
            leagueId: leagueId,
            required: Boolean(setting.required),
          },
        });
      }
    }

    // Return the updated league object
    return await this.prisma.league.findUnique({
      where: { id: leagueId },
      include: {
        teams: true,
        settings: true,
      },
    });
  }
}
