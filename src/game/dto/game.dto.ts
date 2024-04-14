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

export class CreateGameDto {
  homeId: string;
  awayId: string;
  leagueId: string;
}

type GameAttendance = {
  teamId: string;
  players: string[];
};

export class GameAttendanceDto {
  @IsString()
  @IsNotEmpty()
  gameId: string;

  @IsNotEmpty()
  attendance: GameAttendance[];
}
