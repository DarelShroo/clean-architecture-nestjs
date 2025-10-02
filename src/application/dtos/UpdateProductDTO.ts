import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class UpdateProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;
}
