import { ValidationError } from '../errors/DomainError';
import { Email } from '../value-objects/Email';

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    private _email: Email,
    public isActive: boolean,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {
    this.validate();
  }

  get email(): string {
    return this._email.getValue();
  }

  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new ValidationError('User name cannot be empty');
    }
    // Email validation is handled by the Email value object
  }

  updateDetails(name: string, email: string): void {
    this.name = name;
    this._email = new Email(email);
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
    return new User(id, name, new Email(email), true, now, now);
  }
}
