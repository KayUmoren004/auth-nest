import { ApiProperty } from '@nestjs/swagger';
import { AwayTeamType, Fixture, HomeTeamType, Results } from 'types/entities';

// Create a new fixture
export class CreateFixtureResponse {
  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'The ID of the fixture',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'The ID of the fixture results',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  resultsId: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'The ID of the fixture home team',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  homeFixtureId: string;

  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'The ID of the fixture away team',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  awayFixtureId: string;
}

// Edit a fixture's result
export class EditFixtureResultsResponse {
  @ApiProperty({
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    format: 'uuid',
  })
  homeId: string;

  @ApiProperty({
    format: 'uuid',
  })
  awayId: string;

  @ApiProperty({
    type: Number,
    description: 'The home team score',
    example: 2,
  })
  homeScore: number;

  @ApiProperty({
    type: Number,
    description: 'The away team score',
    example: 1,
  })
  awayScore: number;

  @ApiProperty({
    type: String,
    description: 'The winner of the game',
    example: 'Home',
  })
  winner: 'Home' | 'Away' | 'Draw';
}
