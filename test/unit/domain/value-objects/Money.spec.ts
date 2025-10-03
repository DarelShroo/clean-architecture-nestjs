import { Money } from '../../../../src/domain/value-objects/Money';
import { ValidationError } from '../../../../src/domain/errors/DomainError';

describe('Money Value Object', () => {
  describe('constructor', () => {
    it('should create money with valid amount and currency', () => {
      const money = new Money(100, 'USD');
      expect(money.getAmount()).toBe(100);
      expect(money.getCurrency()).toBe('USD');
    });

    it('should use USD as default currency', () => {
      const money = new Money(100);
      expect(money.getCurrency()).toBe('USD');
    });

    it('should round amount to 2 decimal places', () => {
      const money = new Money(99.999, 'USD');
      expect(money.getAmount()).toBe(100);
    });

    it('should throw error for negative amount', () => {
      expect(() => new Money(-100, 'USD')).toThrow(ValidationError);
    });

    it('should throw error for empty currency', () => {
      expect(() => new Money(100, '')).toThrow(ValidationError);
      expect(() => new Money(100, '   ')).toThrow(ValidationError);
    });

    it('should convert currency to uppercase', () => {
      const money = new Money(100, 'eur');
      expect(money.getCurrency()).toBe('EUR');
    });
  });

  describe('arithmetic operations', () => {
    it('should add money with same currency', () => {
      const money1 = new Money(100, 'USD');
      const money2 = new Money(50, 'USD');
      const result = money1.add(money2);

      expect(result.getAmount()).toBe(150);
      expect(result.getCurrency()).toBe('USD');
    });

    it('should throw error when adding money with different currencies', () => {
      const money1 = new Money(100, 'USD');
      const money2 = new Money(50, 'EUR');

      expect(() => money1.add(money2)).toThrow(ValidationError);
    });

    it('should subtract money with same currency', () => {
      const money1 = new Money(100, 'USD');
      const money2 = new Money(30, 'USD');
      const result = money1.subtract(money2);

      expect(result.getAmount()).toBe(70);
      expect(result.getCurrency()).toBe('USD');
    });

    it('should throw error when subtracting money with different currencies', () => {
      const money1 = new Money(100, 'USD');
      const money2 = new Money(30, 'EUR');

      expect(() => money1.subtract(money2)).toThrow(ValidationError);
    });

    it('should multiply money by factor', () => {
      const money = new Money(100, 'USD');
      const result = money.multiply(2.5);

      expect(result.getAmount()).toBe(250);
      expect(result.getCurrency()).toBe('USD');
    });
  });

  describe('comparison methods', () => {
    it('should return true for equal money objects', () => {
      const money1 = new Money(100, 'USD');
      const money2 = new Money(100, 'USD');

      expect(money1.equals(money2)).toBe(true);
    });

    it('should return false for money with different amounts', () => {
      const money1 = new Money(100, 'USD');
      const money2 = new Money(150, 'USD');

      expect(money1.equals(money2)).toBe(false);
    });

    it('should return false for money with different currencies', () => {
      const money1 = new Money(100, 'USD');
      const money2 = new Money(100, 'EUR');

      expect(money1.equals(money2)).toBe(false);
    });

    it('should compare money amounts correctly', () => {
      const money1 = new Money(150, 'USD');
      const money2 = new Money(100, 'USD');

      expect(money1.isGreaterThan(money2)).toBe(true);
      expect(money2.isGreaterThan(money1)).toBe(false);
    });

    it('should throw error when comparing money with different currencies', () => {
      const money1 = new Money(100, 'USD');
      const money2 = new Money(100, 'EUR');

      expect(() => money1.isGreaterThan(money2)).toThrow(ValidationError);
    });
  });

  describe('static methods', () => {
    it('should create money using static create method', () => {
      const money = Money.create(100, 'EUR');
      expect(money.getAmount()).toBe(100);
      expect(money.getCurrency()).toBe('EUR');
    });

    it('should create zero money', () => {
      const money = Money.zero('EUR');
      expect(money.getAmount()).toBe(0);
      expect(money.getCurrency()).toBe('EUR');
    });

    it('should create zero money with default USD currency', () => {
      const money = Money.zero();
      expect(money.getAmount()).toBe(0);
      expect(money.getCurrency()).toBe('USD');
    });
  });

  describe('toString', () => {
    it('should return formatted money string', () => {
      const money = new Money(100, 'USD');
      expect(money.toString()).toBe('100 USD');
    });
  });
});
