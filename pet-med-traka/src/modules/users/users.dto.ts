import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly role?: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly password?: string;

  @IsString()
  @IsOptional()
  readonly role?: string;

  @IsBoolean()
  @IsOptional()
  readonly isActive?: boolean;
}

export class PaginationParams {
  @IsString()
  @IsOptional()
  readonly page?: number;

  @IsString()
  @IsOptional()
  readonly limit?: number;
}
