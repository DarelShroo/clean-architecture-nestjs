import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { EntityNotFoundError } from '../../domain/errors/DomainError';

@Injectable()
export class ActivateUser {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new EntityNotFoundError('User', id);
    }
    user.activate();
    return await this.userRepository.update(user);
  }
}
