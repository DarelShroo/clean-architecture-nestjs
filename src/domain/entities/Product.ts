import { ValidationError } from '../errors/DomainError';

export class Product {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new ValidationError('Product name cannot be empty');
    }
    if (this.price < 0) {
      throw new ValidationError('Product price cannot be negative');
    }
    if (this.stock < 0) {
      throw new ValidationError('Product stock cannot be negative');
    }
  }

  updateDetails(name: string, description: string, price: number): void {
    this.name = name;
    this.description = description;
    this.price = price;
    this.updatedAt = new Date();
    this.validate();
  }

  increaseStock(quantity: number): void {
    if (quantity <= 0) {
      throw new ValidationError('Quantity must be positive');
    }
    this.stock += quantity;
    this.updatedAt = new Date();
  }

  decreaseStock(quantity: number): void {
    if (quantity <= 0) {
      throw new ValidationError('Quantity must be positive');
    }
    if (this.stock < quantity) {
      throw new ValidationError('Insufficient stock');
    }
    this.stock -= quantity;
    this.updatedAt = new Date();
  }

  static create(id: string, name: string, description: string, price: number, stock: number): Product {
    const now = new Date();
    return new Product(id, name, description, price, stock, now, now);
  }
}
