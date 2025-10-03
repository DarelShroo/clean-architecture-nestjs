import { IncreaseStock } from '../../../../src/application/use-cases/IncreaseStock';
import { IProductRepository } from '../../../../src/domain/repositories/IProductRepository';
import { Product } from '../../../../src/domain/entities/Product';
import { UpdateStockDTO } from '../../../../src/application/dtos/UpdateStockDTO';
import { EntityNotFoundError } from '../../../../src/domain/errors/DomainError';

describe('IncreaseStock Use Case', () => {
  let increaseStock: IncreaseStock;
  let mockRepository: jest.Mocked<IProductRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    increaseStock = new IncreaseStock(mockRepository);
  });

  it('should increase stock successfully', async () => {
    const product = Product.create('id', 'Laptop', 'Desc', 999, 50);
    const dto: UpdateStockDTO = { quantity: 10 };

    mockRepository.findById.mockResolvedValue(product);
    mockRepository.update.mockResolvedValue(product);

    const result = await increaseStock.execute('id', dto);

    expect(result.stock).toBe(60);
    expect(mockRepository.update).toHaveBeenCalled();
  });

  it('should throw error when product not found', async () => {
    mockRepository.findById.mockResolvedValue(null);

    await expect(increaseStock.execute('id', { quantity: 10 })).rejects.toThrow(
      EntityNotFoundError,
    );
  });
});
