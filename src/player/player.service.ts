import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePlayerDto } from './dto/player.dto';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

  // Create a new player
  async createPlayer(dto: CreatePlayerDto) {
    return await this.prisma.player.create({
      data: {
        user: { connect: { id: dto.userId } },
        team: { connect: { id: dto.teamId } },
        position: dto.position,
        jerseyNumber: dto.jerseyNumber,
      },
    });
  }
}
