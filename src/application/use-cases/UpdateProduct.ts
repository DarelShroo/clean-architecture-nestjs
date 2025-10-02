import { Injectable, Inject } from '@nestjs/common';
import { Product } from '../../domain/entities/Product';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { UpdateProductDTO } from '../dtos/UpdateProductDTO';
import { EntityNotFoundError } from '../../domain/errors/DomainError';

@Injectable()
export class UpdateProduct {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string, dto: UpdateProductDTO): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new EntityNotFoundError('Product', id);
    }
    product.updateDetails(dto.name, dto.description, dto.price);
    return await this.productRepository.update(product);
  }
}
