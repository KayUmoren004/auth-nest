import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { LeagueService } from './league.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateLeagueDto, SettingDto, UpdateLeagueDto } from './dto/league.dto';

@ApiTags('League')
@Controller('league')
@ApiBearerAuth()
export class LeagueController {
  // Constructor
  constructor(private leagueService: LeagueService) {}

  // Create League Endpoint - POST /create
  @UseGuards(JwtGuard)
  @Post('/create')
  async createLeague(@Body() dto: CreateLeagueDto) {
    return await this.leagueService.createLeague(dto);
  }

  // Get all leagues with sport id Endpoint - Get /{sportId}
  @UseGuards(JwtGuard)
  @Get('/:sportId')
  async findAll(@Param('sportId') sportId: string) {
    return await this.leagueService.findAll(sportId);
  }

  // Get all leagues with school id Endpoint - Get /{schoolId}
  @UseGuards(JwtGuard)
  @Get('/school/:schoolId')
  async findAllBySchool(@Param('schoolId') schoolId: string) {
    return await this.leagueService.findAllBySchool(schoolId);
  }

  // Get league with sport id and league id Endpoint - Get /{sportId}/{leagueId}
  @UseGuards(JwtGuard)
  @Get('/:sportId/:leagueId')
  async findOne(
    @Param('sportId') sportId: string,
    @Param('leagueId') leagueId: string,
  ) {
    const league = await this.leagueService.findOne(leagueId);

    if (league.sportId !== sportId)
      throw new BadRequestException('League does not belong to sport');

    return league;
  }

  // Delete League Endpoint - DELETE /delete/:sportId/:leagueId
  @ApiNoContentResponse()
  @HttpCode(204)
  @UseGuards(JwtGuard)
  @Delete('/delete/:sportId/:leagueId')
  async deleteLeague(
    @Param('leagueId') leagueId: string,
    @Param('sportId') sportId: string,
  ) {
    await this.leagueService.deleteLeague(leagueId, sportId);
  }

  // Update League Endpoint - PATCH /update/:sportId/:leagueId
  @UseGuards(JwtGuard)
  @Patch('/update/:sportId/:leagueId')
  async updateLeague(
    @Param('leagueId') leagueId: string,
    @Param('sportId') sportId: string,
    @Body() dto: UpdateLeagueDto,
  ) {
    if (leagueId !== dto.id)
      throw new BadRequestException('League id does not match');
    return await this.leagueService.updateLeague(leagueId, sportId, dto);
  }

  // Update League Settings Endpoint - PATCH /update/:sportId/:leagueId/settings
  @UseGuards(JwtGuard)
  @Patch('/update/:sportId/:leagueId/settings')
  async updateLeagueSettings(
    @Param('leagueId') leagueId: string,
    @Param('sportId') sportId: string,
    @Body() dto: SettingDto[],
  ) {
    return await this.leagueService.updateLeagueSettings(
      leagueId,
      sportId,
      dto,
    );
  }
}
