import { User } from '../../../../src/domain/entities/User';
import { ValidationError } from '../../../../src/domain/errors/DomainError';

describe('User Entity', () => {
  describe('create', () => {
    it('should create a valid user', () => {
      const user = User.create('123', 'John Doe', 'john@example.com');
      expect(user.id).toBe('123');
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
      expect(user.isActive).toBe(true);
    });

    it('should throw error when name is empty', () => {
      expect(() => User.create('123', '', 'john@example.com')).toThrow(
        ValidationError,
      );
    });

    it('should throw error when email is invalid', () => {
      expect(() => User.create('123', 'John Doe', 'invalid-email')).toThrow(
        ValidationError,
      );
    });
  });

  describe('activate and deactivate', () => {
    it('should activate and deactivate user', () => {
      const user = User.create('123', 'John Doe', 'john@example.com');
      user.deactivate();
      expect(user.isActive).toBe(false);
      user.activate();
      expect(user.isActive).toBe(true);
    });
  });
});
