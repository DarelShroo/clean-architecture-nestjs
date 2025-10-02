import { Injectable, Inject } from '@nestjs/common';
import { Product } from '../../domain/entities/Product';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { UpdateStockDTO } from '../dtos/UpdateStockDTO';
import { EntityNotFoundError } from '../../domain/errors/DomainError';

@Injectable()
export class DecreaseStock {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string, dto: UpdateStockDTO): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new EntityNotFoundError('Product', id);
    }
    product.decreaseStock(dto.quantity);
    return await this.productRepository.update(product);
  }
}
