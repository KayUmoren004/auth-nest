import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
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
}
