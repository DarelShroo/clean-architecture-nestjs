import { CreateProduct } from '../../../../src/application/use-cases/CreateProduct';
import { IProductRepository } from '../../../../src/domain/repositories/IProductRepository';
import { Product } from '../../../../src/domain/entities/Product';
import { CreateProductDTO } from '../../../../src/application/dtos/CreateProductDTO';

describe('CreateProduct Use Case', () => {
  let createProduct: CreateProduct;
  let mockRepository: jest.Mocked<IProductRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    createProduct = new CreateProduct(mockRepository);
  });

  it('should create a product successfully', async () => {
    const dto: CreateProductDTO = {
      name: 'Laptop',
      description: 'High performance',
      price: 999.99,
      stock: 50,
    };

    const product = Product.create(
      'id',
      dto.name,
      dto.description,
      dto.price,
      dto.stock,
    );
    mockRepository.save.mockResolvedValue(product);

    const result = await createProduct.execute(dto);

    expect(result.name).toBe(dto.name);
    expect(mockRepository.save).toHaveBeenCalled();
  });
});
