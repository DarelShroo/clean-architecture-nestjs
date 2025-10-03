import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { Product } from '../../../domain/entities/Product';
import { ProductEntity } from '../entities/ProductEntity';
import { ProductMapper } from '../mappers/ProductMapper';

@Injectable()
export class TypeOrmProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
  ) {}

  async save(product: Product): Promise<Product> {
    const entity = ProductMapper.toEntity(product);
    const saved = await this.repository.save(entity);
    return ProductMapper.toDomain(saved);
  }

  async findById(id: string): Promise<Product | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? ProductMapper.toDomain(entity) : null;
  }

  async findAll(): Promise<Product[]> {
    const entities = await this.repository.find();
    return ProductMapper.toDomainArray(entities);
  }

  async update(product: Product): Promise<Product> {
    const entity = ProductMapper.toEntity(product);
    await this.repository.save(entity);
    return product;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (
      result.affected !== null &&
      result.affected !== undefined &&
      result.affected > 0
    );
  }
}
