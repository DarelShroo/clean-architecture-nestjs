import { ValidationError } from '../errors/DomainError';

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public isActive: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new ValidationError('User name cannot be empty');
    }
    if (!this.email || !this.isValidEmail(this.email)) {
      throw new ValidationError('Invalid email format');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  updateDetails(name: string, email: string): void {
    this.name = name;
    this.email = email;
    this.updatedAt = new Date();
    this.validate();
  }

  activate(): void {
    this.isActive = true;
    this.updatedAt = new Date();
  }

  deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  static create(id: string, name: string, email: string): User {
    const now = new Date();
    return new User(id, name, email, true, now, now);
  }
}
