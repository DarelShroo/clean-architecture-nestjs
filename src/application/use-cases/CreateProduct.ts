import { Injectable, Inject } from '@nestjs/common';
import { Product } from '../../domain/entities/Product';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { CreateProductDTO } from '../dtos/CreateProductDTO';
import { IdGenerator } from '../../shared/utils/IdGenerator';

@Injectable()
export class CreateProduct {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(dto: CreateProductDTO): Promise<Product> {
    const id = IdGenerator.generate();
    const product = Product.create(id, dto.name, dto.description, dto.price, dto.stock);
    return await this.productRepository.save(product);
  }
}
