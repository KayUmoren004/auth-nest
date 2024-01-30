import { IsString } from 'class-validator';

export class GetSchoolUsersDto {
  @IsString()
  id: string;
}
