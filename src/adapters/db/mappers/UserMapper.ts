import { User } from '../../../domain/entities/User';
import { UserEntity } from '../entities/UserEntity';
import { Email } from '../../../domain/value-objects/Email';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.name,
      new Email(entity.email),
      entity.isActive,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  static toEntity(user: User): UserEntity {
    const entity = new UserEntity();
    entity.id = user.id;
    entity.name = user.name;
    entity.email = user.email; // user.email now returns string via getter
    entity.isActive = user.isActive;
    entity.createdAt = user.createdAt;
    entity.updatedAt = user.updatedAt;
    return entity;
  }

  static toDomainArray(entities: UserEntity[]): User[] {
    return entities.map((entity) => this.toDomain(entity));
  }

  static toEntityArray(users: User[]): UserEntity[] {
    return users.map((user) => this.toEntity(user));
  }
}
