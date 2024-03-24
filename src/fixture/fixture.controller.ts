import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { FixtureService } from './fixture.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateFixtureDto, EditFixtureResultsDto } from './dto/fixture.dto';
import {
  CreateFixtureResponse,
  EditFixtureResultsResponse,
} from './dto/fixture.response';

@ApiTags('Fixture')
@Controller('fixture')
@ApiBearerAuth()
export class FixtureController {
  // Constructor
  constructor(private fixtureService: FixtureService) {}

  // Create Fixture Endpoint - POST /create
  @UseGuards(JwtGuard)
  @Post('/create')
  @ApiCreatedResponse({
    type: CreateFixtureResponse,
  })
  async createFixture(@Body() dto: CreateFixtureDto) {
    return await this.fixtureService.createFixture(dto);
  }

  // Edit Fixture Results Endpoint - POST /{fixtureId}/edit-results
  @UseGuards(JwtGuard)
  @Post('/:fixtureId/edit-results')
  @ApiOkResponse({
    type: EditFixtureResultsResponse,
  })
  async editFixtureResults(
    @Body() dto: EditFixtureResultsDto,
    @Param('fixtureId') fixtureId: string,
  ) {
    return await this.fixtureService.editFixtureResults(dto);
  }

  // Get Fixture by ID Endpoint - GET /{fixtureId}
  @UseGuards(JwtGuard)
  @Get('/:fixtureId')
  @ApiOkResponse({
    type: CreateFixtureResponse,
  })
  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'The ID of the fixture',
  })
  async getFixtureById(@Param('fixtureId') fixtureId: string) {
    return await this.fixtureService.findFixtureById(fixtureId);
  }

  // Get All Fixtures in a League Endpoint - GET /league/{leagueId}
  @UseGuards(JwtGuard)
  @Get('/league/:leagueId')
  @ApiOkResponse()
  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'The ID of the league',
  })
  async getFixturesByLeagueId(@Param('leagueId') leagueId: string) {
    return await this.fixtureService.getAllFixturesInLeague(leagueId);
  }

  // Get all fixtures for a team in a league Endpoint - GET /league/{leagueId}/team/{teamId}
  @UseGuards(JwtGuard)
  @Get('/league/:leagueId/team/:teamId')
  @ApiOkResponse()
  async getFixturesByTeamId(
    @Param('leagueId') leagueId: string,
    @Param('teamId') teamId: string,
  ) {
    return await this.fixtureService.getAllFixturesForTeam(teamId, leagueId);
  }
}
