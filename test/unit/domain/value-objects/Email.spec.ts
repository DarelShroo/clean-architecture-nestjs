import { Email } from '../../../../src/domain/value-objects/Email';
import { ValidationError } from '../../../../src/domain/errors/DomainError';

describe('Email Value Object', () => {
  describe('constructor', () => {
    it('should create valid email', () => {
      const email = new Email('test@example.com');
      expect(email.getValue()).toBe('test@example.com');
    });

    it('should throw error for invalid email format', () => {
      expect(() => new Email('invalid-email')).toThrow(ValidationError);
      expect(() => new Email('invalid@')).toThrow(ValidationError);
      expect(() => new Email('@invalid.com')).toThrow(ValidationError);
      expect(() => new Email('')).toThrow(ValidationError);
    });

    it('should throw error for null or undefined email', () => {
      expect(() => new Email(null as any)).toThrow(ValidationError);
      expect(() => new Email(undefined as any)).toThrow(ValidationError);
    });
  });

  describe('equals', () => {
    it('should return true for same email values', () => {
      const email1 = new Email('test@example.com');
      const email2 = new Email('test@example.com');
      expect(email1.equals(email2)).toBe(true);
    });

    it('should return false for different email values', () => {
      const email1 = new Email('test1@example.com');
      const email2 = new Email('test2@example.com');
      expect(email1.equals(email2)).toBe(false);
    });
  });

  describe('toString', () => {
    it('should return email string value', () => {
      const email = new Email('test@example.com');
      expect(email.toString()).toBe('test@example.com');
    });
  });

  describe('create', () => {
    it('should create email using static method', () => {
      const email = Email.create('test@example.com');
      expect(email.getValue()).toBe('test@example.com');
    });
  });
});
