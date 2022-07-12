import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @MaxLength(32)
  @MinLength(1)
  @IsString()
  username: string;

  @MaxLength(32)
  @MinLength(6)
  @IsString()
  password: string;
}
