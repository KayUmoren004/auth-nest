import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  teamId: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  jerseyNumber: string;
}
