import { ApiProperty } from '@nestjs/swagger';

// Create a new school
export class CreateSchoolResponse {
  @ApiProperty({
    type: String,
    format: 'uuid',
    description: 'The ID of the school',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'The name of the school',
    example: 'School of Rock',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'The location of the school (Address)',
    example: '1234 School Lane, Schoolville, SC 12345',
  })
  location: string;

  @ApiProperty({
    type: String,
    description: 'The URL of the school logo',
    example: 'https://schoolofrock.com/logo.png',
  })
  logoUrl: string;

  @ApiProperty({
    type: Date,
    description: 'The date the school was established',
    example: '2020-01-01T00:00:00.000Z',
  })
  establishedDate: Date;

  @ApiProperty({
    type: String,
    description: 'The ID of the school contact',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  contactId: string;

  @ApiProperty({
    type: Date,
    description: 'The date the school was created on the platform',
    example: '2020-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'The date the school was last updated on the platform',
    example: '2020-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
