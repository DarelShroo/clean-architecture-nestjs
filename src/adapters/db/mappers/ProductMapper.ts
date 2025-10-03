import { Product } from '../../../domain/entities/Product';
import { ProductEntity } from '../entities/ProductEntity';

export class ProductMapper {
  static toDomain(entity: ProductEntity): Product {
    return new Product(
      entity.id,
      entity.name,
      entity.description,
      entity.price,
      entity.stock,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toEntity(product: Product): ProductEntity {
    const entity = new ProductEntity();
    entity.id = product.id;
    entity.name = product.name;
    entity.description = product.description;
    entity.price = product.price;
    entity.stock = product.stock;
    entity.createdAt = product.createdAt;
    entity.updatedAt = product.updatedAt;
    return entity;
  }

  static toDomainArray(entities: ProductEntity[]): Product[] {
    return entities.map(entity => this.toDomain(entity));
  }

  static toEntityArray(products: Product[]): ProductEntity[] {
    return products.map(product => this.toEntity(product));
  }
}
