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
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { TeamService } from './team.service';
import { CreateTeamDto, GetTeamResponse, UpdateTeamDto } from './dto/team.dto';
import { TransformInterceptor } from 'src/interceptor';
import { CreatePlayerDto } from 'src/player/dto/player.dto';

@ApiTags('Team')
@Controller('team')
@ApiBearerAuth()
@UseInterceptors(TransformInterceptor)
export class TeamController {
  // Constructor
  constructor(private teamService: TeamService) {}

  // Create Team Endpoint - POST /create
  @UseGuards(JwtGuard)
  @Post('/create')
  @ApiCreatedResponse({
    type: GetTeamResponse,
  })
  async createTeam(@Body() dto: CreateTeamDto) {
    return await this.teamService.createTeam(dto);
  }

  // Add Player to Team Endpoint - POST /add-player
  @UseGuards(JwtGuard)
  @Post('/add-player')
  // @ApiOkResponse({
  //   type: GetTeamResponse,
  // })
  async addPlayerToTeam(@Body() dto: CreatePlayerDto) {
    return await this.teamService.addPlayer(dto);
  }

  // Get all teams with league id Endpoint - Get /{leagueId}
  @UseGuards(JwtGuard)
  @Get('/:leagueId')
  async findAll(@Param('leagueId') leagueId: string) {
    return await this.teamService.findAll(leagueId);
  }

  // Get all teams with school id Endpoint - Get /{schoolId}
  @UseGuards(JwtGuard)
  @Get('/school/:schoolId')
  async findAllBySchool(@Param('schoolId') schoolId: string) {
    return await this.teamService.findAllBySchool(schoolId);
  }

  // Get team with league id and team id Endpoint - Get /{leagueId}/{teamId}
  @UseGuards(JwtGuard)
  @Get('/:leagueId/:teamId')
  async findOne(
    @Param('leagueId') leagueId: string,
    @Param('teamId') teamId: string,
  ) {
    const team = await this.teamService.findOne(teamId);

    if (team.leagueId !== leagueId)
      throw new BadRequestException('Team does not belong to league');

    return team;
  }

  // Delete team with league id and team id Endpoint - Delete /delete/{leagueId}/{teamId}
  @UseGuards(JwtGuard)
  @Delete('/delete/:leagueId/:teamId')
  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'Team deleted',
  })
  async deleteTeam(
    @Param('leagueId') leagueId: string,
    @Param('teamId') teamId: string,
  ) {
    await this.teamService.deleteTeam(teamId, leagueId);
  }

  // Update team with league id and team id Endpoint - Patch /update/{leagueId}/{teamId}
  @UseGuards(JwtGuard)
  @Patch('/update/:leagueId/:teamId')
  async updateTeam(
    @Param('leagueId') leagueId: string,
    @Param('teamId') teamId: string,
    @Body() dto: UpdateTeamDto,
  ) {
    await this.teamService.updateTeam(teamId, leagueId, dto);
  }

  // Join team with league id and team id Endpoint - Post /join/{leagueId}/{teamId}/{userId}
  @UseGuards(JwtGuard)
  @Post('/join/:leagueId/:teamId/:userId')
  async joinTeam(
    @Param('leagueId') leagueId: string,
    @Param('teamId') teamId: string,
    @Param('userId') userId: string,
  ) {
    await this.teamService.joinTeam(teamId, userId);
  }
}
