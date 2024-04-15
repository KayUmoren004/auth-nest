import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';

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

  @ApiProperty()
  @IsObject()
  profilePhoto?: any;
}

export class UpdateUserPhotoDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  photo: FormData;
}
