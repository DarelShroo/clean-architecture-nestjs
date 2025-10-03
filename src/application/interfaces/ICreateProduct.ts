import { Product } from '../../domain/entities/Product';
import { CreateProductDTO } from '../dtos/CreateProductDTO';

export interface ICreateProduct {
  execute(dto: CreateProductDTO): Promise<Product>;
}
