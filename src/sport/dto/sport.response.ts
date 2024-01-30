import { League } from 'types/entities';

import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinDate,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class GetSportsResponse {
  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'The ID of the sport',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'The ID of the school',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  schoolId: string;

  @ApiProperty({
    type: String,
    description: 'The name of the sport',
    example: 'Basketball',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'The season of the sport',
    example: 'Winter',
  })
  season: string;

  @ApiProperty({
    type: String,
    description: 'The description of the sport',
    example: 'The best sport ever',
  })
  description: string;

  @ApiProperty({
    type: String,
    description: 'The rules of the sport',
    example: 'https://www.nba.com/official/basketballrules.html',
  })
  rulesUrl: string;

  @ApiProperty({
    type: String,
    description: 'The status of the sport',
    example: 'Active',
  })
  status: string;

  @ApiProperty({
    type: Array,
    description: 'The leagues of the sport',
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        sportId: '123e4567-e89b-12d3-a456-426614174000',
        name: 'League 1',
        division: 'Division 1',
        startDate: '2021-01-01T00:00:00.000Z',
        endDate: '2021-01-01T00:00:00.000Z',
      },
    ],
  })
  leagues: {
    id: string;
    sportId: string;
    name: string;
    division: string;
    startDate: Date;
    endDate: Date;
  }[];
}
