import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { League } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinDate,
} from 'class-validator';

export class CreateTeamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  leagueId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  captainId: string;

  @ApiProperty()
  @IsString()
  @Optional()
  logoUrl: string;

  @ApiProperty()
  @IsString()
  @Optional()
  shortName: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  jerseyNumber: string;
}

export class UpdateTeamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @Optional()
  name: string;

  @ApiProperty()
  @IsString()
  @Optional()
  captainId: string;

  @ApiProperty()
  @IsString()
  @Optional()
  logoUrl: string;

  @ApiProperty()
  @IsNumber()
  @Optional()
  wins: number;

  @ApiProperty()
  @IsNumber()
  @Optional()
  losses: number;

  @ApiProperty()
  @IsNumber()
  @Optional()
  ties: number;
}

export class GetTeamResponse {
  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'Team id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'League id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  leagueId: string;

  @ApiProperty({
    type: String,
    description: 'Team name',
    example: 'Team 1',
  })
  name: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'Captain id',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  captainId: string;

  @ApiProperty({
    type: String,
    description: 'Team logo url',
    example: 'https://www.google.com',
  })
  logoUrl: string;

  @ApiProperty({
    type: Number,
    description: 'Team wins',
    example: 1,
  })
  wins: number;

  @ApiProperty({
    type: Number,
    description: 'Team losses',
    example: 1,
  })
  losses: number;

  @ApiProperty({
    type: Number,
    description: 'Team ties',
    example: 1,
  })
  ties: number;

  @ApiProperty({
    type: Object,
    description: 'Team League',
    example: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'League 1',
      division: 'Division 1',
      startDate: '2021-10-10T00:00:00.000Z',
      endDate: '2021-10-10T00:00:00.000Z',
    },
  })
  league: League;
}

export class JoinTeamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  teamId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  jerseyNumber: string;
}
