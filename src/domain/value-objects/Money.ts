import { ValidationError } from '../errors/DomainError';

export class Money {
  private readonly amount: number;
  private readonly currency: string;

  constructor(amount: number, currency: string = 'USD') {
    if (amount < 0) {
      throw new ValidationError('Money amount cannot be negative');
    }
    if (!currency || currency.trim().length === 0) {
      throw new ValidationError('Currency cannot be empty');
    }
    this.amount = Math.round(amount * 100) / 100; // Round to 2 decimal places
    this.currency = currency.toUpperCase();
  }

  getAmount(): number {
    return this.amount;
  }

  getCurrency(): string {
    return this.currency;
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new ValidationError('Cannot add money with different currencies');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  subtract(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new ValidationError(
        'Cannot subtract money with different currencies',
      );
    }
    return new Money(this.amount - other.amount, this.currency);
  }

  multiply(factor: number): Money {
    return new Money(this.amount * factor, this.currency);
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  isGreaterThan(other: Money): boolean {
    if (this.currency !== other.currency) {
      throw new ValidationError(
        'Cannot compare money with different currencies',
      );
    }
    return this.amount > other.amount;
  }

  toString(): string {
    return `${this.amount} ${this.currency}`;
  }

  static create(amount: number, currency: string = 'USD'): Money {
    return new Money(amount, currency);
  }

  static zero(currency: string = 'USD'): Money {
    return new Money(0, currency);
  }
}
