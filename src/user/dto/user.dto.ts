import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  role: string;

  @ApiProperty()
  @IsString()
  schoolDomain: string;
}

export class UpdateUserPhotoDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  photo: FormData;
}
