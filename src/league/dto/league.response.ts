import { ApiProperty } from '@nestjs/swagger';

export class CreateLeague {
  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'The ID of the league',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'The ID of the sport',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  sportId: string;

  @ApiProperty({
    type: String,
    description: 'The name of the league',
    example: 'Basketball League',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'The division of the league',
    example: 'Division 1',
  })
  division: string;

  @ApiProperty({
    type: Date,
    description: 'The start date of the league',
    example: '2022-01-01T00:00:00.000Z',
  })
  startDate: Date;

  @ApiProperty({
    type: Date,
    description: 'The end date of the league',
    example: '2022-01-01T00:00:00.000Z',
  })
  endDate: Date;
}

export class GetLeaguesWithSportID {}

export class GetSchoolLeagues {}

export class GetLeagueWithSportIDAndLeagueID {}

export class DeleteLeagueWithSportIDAndLeagueID {}

export class UpdateLeagueWithSportIDAndLeagueID {}

export class UpdateLeagueSettingsWithSportIDAndLeagueID {}
