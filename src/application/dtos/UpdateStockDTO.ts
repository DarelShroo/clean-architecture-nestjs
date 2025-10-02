import { IsNumber, Min } from 'class-validator';

export class UpdateStockDTO {
  @IsNumber()
  @Min(1)
  quantity: number;
}
