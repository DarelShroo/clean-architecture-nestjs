import { Product } from '../entities/Product';

export interface IProductRepository {
  save(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  update(product: Product): Promise<Product>;
  delete(id: string): Promise<boolean>;
}
