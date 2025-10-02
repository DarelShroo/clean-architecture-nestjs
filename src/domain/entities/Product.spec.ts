import { Product } from './Product';
import { ValidationError } from '../errors/DomainError';

describe('Product Entity', () => {
  describe('create', () => {
    it('should create a valid product', () => {
      const product = Product.create('123', 'Laptop', 'High performance laptop', 999.99, 10);
      
      expect(product.id).toBe('123');
      expect(product.name).toBe('Laptop');
      expect(product.description).toBe('High performance laptop');
      expect(product.price).toBe(999.99);
      expect(product.stock).toBe(10);
    });

    it('should throw error when name is empty', () => {
      expect(() => {
        Product.create('123', '', 'Description', 100, 10);
      }).toThrow(ValidationError);
    });

    it('should throw error when price is negative', () => {
      expect(() => {
        Product.create('123', 'Product', 'Description', -100, 10);
      }).toThrow(ValidationError);
    });

    it('should throw error when stock is negative', () => {
      expect(() => {
        Product.create('123', 'Product', 'Description', 100, -10);
      }).toThrow(ValidationError);
    });
  });

  describe('updateDetails', () => {
    it('should update product details', () => {
      const product = Product.create('123', 'Laptop', 'Old description', 999.99, 10);
      product.updateDetails('Gaming Laptop', 'New description', 1299.99);
      
      expect(product.name).toBe('Gaming Laptop');
      expect(product.description).toBe('New description');
      expect(product.price).toBe(1299.99);
    });
  });

  describe('increaseStock', () => {
    it('should increase stock correctly', () => {
      const product = Product.create('123', 'Laptop', 'Description', 999.99, 10);
      product.increaseStock(5);
      
      expect(product.stock).toBe(15);
    });

    it('should throw error when quantity is zero or negative', () => {
      const product = Product.create('123', 'Laptop', 'Description', 999.99, 10);
      
      expect(() => product.increaseStock(0)).toThrow(ValidationError);
      expect(() => product.increaseStock(-5)).toThrow(ValidationError);
    });
  });

  describe('decreaseStock', () => {
    it('should decrease stock correctly', () => {
      const product = Product.create('123', 'Laptop', 'Description', 999.99, 10);
      product.decreaseStock(3);
      
      expect(product.stock).toBe(7);
    });

    it('should throw error when quantity exceeds stock', () => {
      const product = Product.create('123', 'Laptop', 'Description', 999.99, 10);
      
      expect(() => product.decreaseStock(15)).toThrow(ValidationError);
    });

    it('should throw error when quantity is zero or negative', () => {
      const product = Product.create('123', 'Laptop', 'Description', 999.99, 10);
      
      expect(() => product.decreaseStock(0)).toThrow(ValidationError);
      expect(() => product.decreaseStock(-5)).toThrow(ValidationError);
    });
  });
});

