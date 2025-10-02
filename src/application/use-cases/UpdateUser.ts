import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { EntityNotFoundError } from '../../domain/errors/DomainError';

@Injectable()
export class UpdateUser {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, dto: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new EntityNotFoundError('User', id);
    }
    user.updateDetails(dto.name, dto.email);
    return await this.userRepository.update(user);
  }
}
