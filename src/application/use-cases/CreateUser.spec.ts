import { CreateUser } from './CreateUser';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { EntityAlreadyExistsError } from '../../domain/errors/DomainError';

describe('CreateUser Use Case', () => {
  let createUser: CreateUser;
  let mockRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    createUser = new CreateUser(mockRepository);
  });

  it('should create a user successfully', async () => {
    const dto: CreateUserDTO = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    mockRepository.findByEmail.mockResolvedValue(null);
    const user = User.create('id', dto.name, dto.email);
    mockRepository.save.mockResolvedValue(user);

    const result = await createUser.execute(dto);

    expect(result.name).toBe(dto.name);
    expect(result.email).toBe(dto.email);
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('should throw error when email already exists', async () => {
    const dto: CreateUserDTO = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    const existingUser = User.create('id', 'Jane', dto.email);
    mockRepository.findByEmail.mockResolvedValue(existingUser);

    await expect(createUser.execute(dto)).rejects.toThrow(EntityAlreadyExistsError);
  });
});
