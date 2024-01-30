import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateSportDto,
  SettingDto,
  SettingsDto,
  UpdateSportDto,
} from './dto/sport.dto';

@Injectable()
export class SportService {
  constructor(private prisma: PrismaService) {}

  // Create a new sport
  async createSport(dto: CreateSportDto) {
    // Check if sport exists
    const sport = await this.prisma.sport.findUnique({
      where: { name: dto.name },
    });

    // If sport exists, throw an error
    if (sport) throw new ConflictException('Sport already exists');

    const newSport = await this.prisma.sport.create({
      data: dto,
    });

    // Return the sport
    return newSport;
  }

  // Return all sports given a school id
  async findAll(schoolId: string) {
    return await this.prisma.sport.findMany({
      where: { schoolId },
      include: {
        leagues: true,
        settings: true,
      },
    });
  }

  // Delete a sport given a sport id and school id
  async deleteSport(sportId: string, schoolId: string) {
    // Check if sport exists
    const sport = await this.prisma.sport.findUnique({
      where: { id: sportId },
    });

    // If sport does not exist, throw an error
    if (!sport) throw new ConflictException('Sport does not exist');

    // Check if sport belongs to school
    if (sport.schoolId !== schoolId)
      throw new ConflictException('Sport does not belong to school');

    // Delete the sport
    await this.prisma.sport.delete({
      where: { id: sportId },
    });
  }

  // Update a sport given a sport id and school id
  async updateSport(sportId: string, schoolId: string, dto: UpdateSportDto) {
    // Check if sport exists
    const sport = await this.prisma.sport.findUnique({
      where: { id: sportId },
    });

    // If sport does not exist, throw an error
    if (!sport) throw new ConflictException('Sport does not exist');

    // Check if sport belongs to school
    if (sport.schoolId !== schoolId)
      throw new ConflictException('Sport does not belong to school');

    // Compare all fields in the dto to the sport and only update the ones that are different
    const newSport = await this.prisma.sport.update({
      where: { id: sportId },
      data: {
        name: dto.name ? dto.name : sport.name,
        season: dto.season ? dto.season : sport.season,
        description: dto.description ? dto.description : sport.description,
        rulesUrl: dto.rulesUrl ? dto.rulesUrl : sport.rulesUrl,
        status: dto.status ? dto.status : sport.status,
      },
    });

    // Return the new sport
    return newSport;
  }

  // Return a sport given a sport id
  async findOne(sportId: string) {
    return await this.prisma.sport.findUnique({
      where: { id: sportId },
      include: {
        leagues: true,
        settings: true,
      },
    });
  }

  // Update a sport's settings given a sport id and school id
  async updateSettings(sportId: string, schoolId: string, dto: SettingDto[]) {
    // Check if sport exists
    const sport = await this.prisma.sport.findUnique({
      where: { id: sportId },
    });

    if (!sport) throw new ConflictException('Sport does not exist');

    if (sport.schoolId !== schoolId)
      throw new ConflictException('Sport does not belong to school');

    // Update each setting in the settings array
    for (const setting of dto) {
      const id = setting.id;

      if (id) {
        await this.prisma.sportSettings.update({
          where: { id },
          data: {
            name: setting.name,
            value: setting.value,
            sportId: sportId,
            required: Boolean(setting.required),
          },
        });
      } else {
        await this.prisma.sportSettings.create({
          data: {
            name: setting.name,
            value: setting.value,
            sportId: sportId,
            required: Boolean(setting.required),
          },
        });
      }
    }

    // Return the updated sport object
    return await this.prisma.sport.findUnique({
      where: { id: sportId },
      include: {
        leagues: true,
        settings: true,
      },
    });
  }
}
