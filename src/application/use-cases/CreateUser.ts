import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { IdGenerator } from '../../shared/utils/IdGenerator';
import { EntityAlreadyExistsError } from '../../domain/errors/DomainError';

@Injectable()
export class CreateUser {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: CreateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new EntityAlreadyExistsError('User', dto.email);
    }
    const id = IdGenerator.generate();
    const user = User.create(id, dto.name, dto.email);
    return await this.userRepository.save(user);
  }
}
