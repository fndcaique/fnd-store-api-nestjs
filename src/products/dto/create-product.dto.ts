import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  @MaxLength(128)
  name: string;

  @IsNumber()
  quantity: number;
}
