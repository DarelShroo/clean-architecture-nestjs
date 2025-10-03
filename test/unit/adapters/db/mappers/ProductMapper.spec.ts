import { ProductMapper } from '../../../../../src/adapters/db/mappers/ProductMapper';
import { Product } from '../../../../../src/domain/entities/Product';
import { ProductEntity } from '../../../../../src/adapters/db/entities/ProductEntity';

describe('ProductMapper', () => {
  describe('toDomain', () => {
    it('should convert ProductEntity to Product domain entity', () => {
      const entity = new ProductEntity();
      entity.id = '123';
      entity.name = 'Test Product';
      entity.description = 'Test Description';
      entity.price = 99.99;
      entity.stock = 10;
      entity.createdAt = new Date('2023-01-01');
      entity.updatedAt = new Date('2023-01-02');

      const product = ProductMapper.toDomain(entity);

      expect(product.id).toBe('123');
      expect(product.name).toBe('Test Product');
      expect(product.description).toBe('Test Description');
      expect(product.price).toBe(99.99);
      expect(product.stock).toBe(10);
      expect(product.createdAt).toEqual(new Date('2023-01-01'));
      expect(product.updatedAt).toEqual(new Date('2023-01-02'));
    });
  });

  describe('toEntity', () => {
    it('should convert Product domain entity to ProductEntity', () => {
      const product = Product.create(
        '123',
        'Test Product',
        'Test Description',
        99.99,
        10,
      );

      const entity = ProductMapper.toEntity(product);

      expect(entity.id).toBe(product.id);
      expect(entity.name).toBe(product.name);
      expect(entity.description).toBe(product.description);
      expect(entity.price).toBe(product.price);
      expect(entity.stock).toBe(product.stock);
      expect(entity.createdAt).toBe(product.createdAt);
      expect(entity.updatedAt).toBe(product.updatedAt);
    });
  });

  describe('toDomainArray', () => {
    it('should convert array of ProductEntity to array of Product domain entities', () => {
      const entity1 = new ProductEntity();
      entity1.id = '123';
      entity1.name = 'Product 1';
      entity1.description = 'Description 1';
      entity1.price = 99.99;
      entity1.stock = 10;
      entity1.createdAt = new Date('2023-01-01');
      entity1.updatedAt = new Date('2023-01-02');

      const entity2 = new ProductEntity();
      entity2.id = '456';
      entity2.name = 'Product 2';
      entity2.description = 'Description 2';
      entity2.price = 149.99;
      entity2.stock = 5;
      entity2.createdAt = new Date('2023-01-03');
      entity2.updatedAt = new Date('2023-01-04');

      const entities = [entity1, entity2];
      const products = ProductMapper.toDomainArray(entities);

      expect(products).toHaveLength(2);
      expect(products[0].id).toBe('123');
      expect(products[1].id).toBe('456');
    });

    it('should return empty array for empty input', () => {
      const products = ProductMapper.toDomainArray([]);
      expect(products).toEqual([]);
    });
  });

  describe('toEntityArray', () => {
    it('should convert array of Product domain entities to array of ProductEntity', () => {
      const product1 = Product.create(
        '123',
        'Product 1',
        'Description 1',
        99.99,
        10,
      );
      const product2 = Product.create(
        '456',
        'Product 2',
        'Description 2',
        149.99,
        5,
      );

      const products = [product1, product2];
      const entities = ProductMapper.toEntityArray(products);

      expect(entities).toHaveLength(2);
      expect(entities[0].id).toBe('123');
      expect(entities[1].id).toBe('456');
    });

    it('should return empty array for empty input', () => {
      const entities = ProductMapper.toEntityArray([]);
      expect(entities).toEqual([]);
    });
  });
});
