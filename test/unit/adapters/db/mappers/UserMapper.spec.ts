import { UserMapper } from '../../../../../src/adapters/db/mappers/UserMapper';
import { User } from '../../../../../src/domain/entities/User';
import { UserEntity } from '../../../../../src/adapters/db/entities/UserEntity';

describe('UserMapper', () => {
  describe('toDomain', () => {
    it('should convert UserEntity to User domain entity', () => {
      const entity = new UserEntity();
      entity.id = '123';
      entity.name = 'John Doe';
      entity.email = 'john@example.com';
      entity.isActive = true;
      entity.createdAt = new Date('2023-01-01');
      entity.updatedAt = new Date('2023-01-02');

      const user = UserMapper.toDomain(entity);

      expect(user.id).toBe('123');
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com'); // getter returns string
      expect(user.isActive).toBe(true);
      expect(user.createdAt).toEqual(new Date('2023-01-01'));
      expect(user.updatedAt).toEqual(new Date('2023-01-02'));
    });
  });

  describe('toEntity', () => {
    it('should convert User domain entity to UserEntity', () => {
      const user = User.create('123', 'John Doe', 'john@example.com');

      const entity = UserMapper.toEntity(user);

      expect(entity.id).toBe(user.id);
      expect(entity.name).toBe(user.name);
      expect(entity.email).toBe(user.email); // user.email getter returns string
      expect(entity.isActive).toBe(user.isActive);
      expect(entity.createdAt).toBe(user.createdAt);
      expect(entity.updatedAt).toBe(user.updatedAt);
    });
  });

  describe('toDomainArray', () => {
    it('should convert array of UserEntity to array of User domain entities', () => {
      const entity1 = new UserEntity();
      entity1.id = '123';
      entity1.name = 'User 1';
      entity1.email = 'user1@example.com';
      entity1.isActive = true;
      entity1.createdAt = new Date('2023-01-01');
      entity1.updatedAt = new Date('2023-01-02');

      const entity2 = new UserEntity();
      entity2.id = '456';
      entity2.name = 'User 2';
      entity2.email = 'user2@example.com';
      entity2.isActive = false;
      entity2.createdAt = new Date('2023-01-03');
      entity2.updatedAt = new Date('2023-01-04');

      const entities = [entity1, entity2];
      const users = UserMapper.toDomainArray(entities);

      expect(users).toHaveLength(2);
      expect(users[0].id).toBe('123');
      expect(users[1].id).toBe('456');
    });

    it('should return empty array for empty input', () => {
      const users = UserMapper.toDomainArray([]);
      expect(users).toEqual([]);
    });
  });

  describe('toEntityArray', () => {
    it('should convert array of User domain entities to array of UserEntity', () => {
      const user1 = User.create('123', 'User 1', 'user1@example.com');
      const user2 = User.create('456', 'User 2', 'user2@example.com');

      const users = [user1, user2];
      const entities = UserMapper.toEntityArray(users);

      expect(entities).toHaveLength(2);
      expect(entities[0].id).toBe('123');
      expect(entities[1].id).toBe('456');
    });

    it('should return empty array for empty input', () => {
      const entities = UserMapper.toEntityArray([]);
      expect(entities).toEqual([]);
    });
  });
});
