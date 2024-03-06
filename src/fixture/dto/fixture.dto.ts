import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinDate,
  ValidateNested,
} from 'class-validator';

export class CreateFixtureDto {
  @ApiProperty({
    format: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  homeId: string;

  @ApiProperty({
    format: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  awayId: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;
}

export class EditFixtureResultsDto {
  @ApiProperty({
    type: Number,
    description: 'The home team score',
  })
  @IsNumber()
  @IsNotEmpty()
  homeScore: number;

  @ApiProperty({
    type: Number,
    description: 'The away team score',
  })
  @IsNumber()
  @IsNotEmpty()
  awayScore: number;

  @ApiProperty({
    type: String,
    description: 'The winner of the game',
    example: 'Home',
  })
  @IsString()
  @IsNotEmpty()
  winner: 'Home' | 'Away' | 'Draw';

  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'The ID of the fixture',
  })
  @IsString()
  @IsNotEmpty()
  fixtureId: string;
}
