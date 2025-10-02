import { Injectable, Inject } from '@nestjs/common';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { EntityNotFoundError } from '../../domain/errors/DomainError';

@Injectable()
export class DeleteProduct {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new EntityNotFoundError('Product', id);
    }
    await this.productRepository.delete(id);
  }
}
