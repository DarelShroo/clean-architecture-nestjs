import { GetProductById } from '../../../../src/application/use-cases/GetProductById';
import { IProductRepository } from '../../../../src/domain/repositories/IProductRepository';
import { Product } from '../../../../src/domain/entities/Product';
import { EntityNotFoundError } from '../../../../src/domain/errors/DomainError';

describe('GetProductById Use Case', () => {
  let getProductById: GetProductById;
  let mockRepository: jest.Mocked<IProductRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    getProductById = new GetProductById(mockRepository);
  });

  it('should return product when found', async () => {
    const product = Product.create('id', 'Laptop', 'Desc', 999, 10);
    mockRepository.findById.mockResolvedValue(product);

    const result = await getProductById.execute('id');

    expect(result.id).toBe('id');
    expect(mockRepository.findById).toHaveBeenCalledWith('id');
  });

  it('should throw error when product not found', async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(getProductById.execute('id')).rejects.toThrow(EntityNotFoundError);
  });
});
