import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Options,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SportService } from './sport.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import {
  CreateSportDto,
  SettingDto,
  SettingsDto,
  UpdateSportDto,
} from './dto/sport.dto';
import { GetSportsResponse } from './dto/sport.response';

@ApiTags('Sport')
@Controller('sport')
@ApiBearerAuth()
export class SportController {
  // Constructor
  constructor(private sportService: SportService) {}

  // Create Sport Endpoint - POST /create
  @UseGuards(JwtGuard)
  @Post('/create')
  async createSport(@Body() dto: CreateSportDto) {
    return await this.sportService.createSport(dto);
  }

  // Get all sports with school id Endpoint - Get /{schoolId}
  @UseGuards(JwtGuard)
  @Get('/:schoolId')
  @ApiOkResponse({
    type: GetSportsResponse,
  })
  async findAll(@Param('schoolId') schoolId: string) {
    return await this.sportService.findAll(schoolId);
  }

  // Get sport with school id and sport id Endpoint - Get /{schoolId}/{sportId}
  @UseGuards(JwtGuard)
  @Get('/:schoolId/:sportId')
  async findOne(
    @Param('schoolId') schoolId: string,
    @Param('sportId') sportId: string,
  ) {
    const sport = await this.sportService.findOne(sportId);

    if (sport.schoolId !== schoolId)
      throw new BadRequestException('Sport does not belong to school');

    return sport;
  }

  // Delete Sport Endpoint - DELETE /delete/:schoolId/:sportId
  @ApiNoContentResponse()
  @HttpCode(204)
  @UseGuards(JwtGuard)
  @Delete('/delete/:schoolId/:sportId')
  async deleteSport(
    @Param('sportId') sportId: string,
    @Param('schoolId') schoolId: string,
  ) {
    await this.sportService.deleteSport(sportId, schoolId);
  }

  // Update Sport Endpoint - PATCH /update/:schoolId/:sportId
  @UseGuards(JwtGuard)
  @Patch('/update/:schoolId/:sportId')
  async updateSport(
    @Param('sportId') sportId: string,
    @Param('schoolId') schoolId: string,
    @Body() dto: UpdateSportDto,
  ) {
    if (sportId !== dto.id)
      throw new BadRequestException('Sport id does not match');
    return await this.sportService.updateSport(sportId, schoolId, dto);
  }

  // Update Sport Settings Endpoint - PATCH /update/:schoolId/:sportId/settings
  @UseGuards(JwtGuard)
  @Patch('/update/:schoolId/:sportId/settings')
  async updateSportSettings(
    @Param('sportId') sportId: string,
    @Param('schoolId') schoolId: string,
    @Body() dto: SettingDto[],
  ) {
    return await this.sportService.updateSettings(sportId, schoolId, dto);
  }
}
