import { ValidationError } from '../errors/DomainError';

export class Email {
  private readonly value: string;

  constructor(email: string) {
    if (!email || !this.isValid(email)) {
      throw new ValidationError('Invalid email format');
    }
    this.value = email;
  }

  private isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }

  static create(email: string): Email {
    return new Email(email);
  }
}
