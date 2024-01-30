import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateSportDto {
  @ApiProperty()
  @IsString()
  schoolId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  season: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  rulesUrl: string;
}

export class UpdateSportDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  season: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  rulesUrl: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  status: string;
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
  value: string;

  @ApiProperty()
  @IsBoolean()
  required: string;
}

export class SettingsDto {
  @ApiProperty()
  @IsString()
  sportId: string;

  @ApiProperty({ type: [SettingDto] })
  @ValidateNested({ each: true })
  @Type(() => SettingDto)
  settings: SettingDto[];
}
