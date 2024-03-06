import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class GetSchoolUsersDto {
  @IsString()
  id: string;
}

class SchoolDomain {
  @IsString()
  @IsNotEmpty()
  domain: string;

  @IsString()
  @IsNotEmpty()
  slug: string;
}

class SchoolContact {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}

export class CreateSchoolDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  logoUrl: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  establishedDate: Date;

  // @IsString()
  // @IsNotEmpty()
  // slug: string;

  @Type(() => SchoolDomain)
  @ValidateNested()
  domain: SchoolDomain;

  @Type(() => SchoolContact)
  @ValidateNested()
  contact: SchoolContact;
}
