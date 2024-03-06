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

export class CreateLeagueDto {
  @ApiProperty()
  @IsString()
  sportId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  division: string;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @MinDate(new Date())
  startDate: Date;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @MinDate(new Date())
  endDate: Date;
}

export class UpdateLeagueDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  division: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  // @MinDate(new Date())
  startDate: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  // @MinDate(new Date())
  endDate: Date;
}

export class LeagueScoringDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tie: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  win: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  loss: string;
}

export class SettingDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  value: any;

  @ApiProperty()
  @IsBoolean()
  required: string;
}

export class SettingsDto {
  @ApiProperty({ type: [SettingDto] })
  @ValidateNested({ each: true })
  @Type(() => SettingDto)
  settings: SettingDto[];
}
