import { InMemoryEventBus, EventHandler } from '../../../../src/domain/events/EventBus';
import { DomainEvent, ProductCreated, StockChanged } from '../../../../src/domain/events/DomainEvent';

describe('InMemoryEventBus', () => {
  let eventBus: InMemoryEventBus;

  beforeEach(() => {
    eventBus = new InMemoryEventBus();
  });

  describe('subscribe and publish', () => {
    it('should handle events correctly', async () => {
      const mockHandler: EventHandler<ProductCreated> = {
        handle: jest.fn(),
      };

      eventBus.subscribe('product.created', mockHandler);

      const event = new ProductCreated('123', 'Test Product', 99.99);
      await eventBus.publish(event);

      expect(mockHandler.handle).toHaveBeenCalledWith(event);
      expect(mockHandler.handle).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple handlers for same event', async () => {
      const handler1: EventHandler<ProductCreated> = {
        handle: jest.fn(),
      };
      const handler2: EventHandler<ProductCreated> = {
        handle: jest.fn(),
      };

      eventBus.subscribe('product.created', handler1);
      eventBus.subscribe('product.created', handler2);

      const event = new ProductCreated('123', 'Test Product', 99.99);
      await eventBus.publish(event);

      expect(handler1.handle).toHaveBeenCalledWith(event);
      expect(handler2.handle).toHaveBeenCalledWith(event);
    });

    it('should handle different event types', async () => {
      const productCreatedHandler: EventHandler<ProductCreated> = {
        handle: jest.fn(),
      };
      const stockChangedHandler: EventHandler<StockChanged> = {
        handle: jest.fn(),
      };

      eventBus.subscribe('product.created', productCreatedHandler);
      eventBus.subscribe('product.stock_changed', stockChangedHandler);

      const createdEvent = new ProductCreated('123', 'Test Product', 99.99);
      const stockEvent = new StockChanged('123', 10, 15, 'increase');

      await eventBus.publish(createdEvent);
      await eventBus.publish(stockEvent);

      expect(productCreatedHandler.handle).toHaveBeenCalledWith(createdEvent);
      expect(stockChangedHandler.handle).toHaveBeenCalledWith(stockEvent);
      expect(productCreatedHandler.handle).toHaveBeenCalledTimes(1);
      expect(stockChangedHandler.handle).toHaveBeenCalledTimes(1);
    });

    it('should not call handler for unregistered events', async () => {
      const mockHandler: EventHandler<ProductCreated> = {
        handle: jest.fn(),
      };

      eventBus.subscribe('product.created', mockHandler);

      const stockEvent = new StockChanged('123', 10, 15, 'increase');
      await eventBus.publish(stockEvent);

      expect(mockHandler.handle).not.toHaveBeenCalled();
    });

    it('should handle handler errors gracefully', async () => {
      const errorHandler: EventHandler<ProductCreated> = {
        handle: jest.fn().mockImplementation(() => {
          throw new Error('Handler error');
        }),
      };
      const workingHandler: EventHandler<ProductCreated> = {
        handle: jest.fn(),
      };

      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      eventBus.subscribe('product.created', errorHandler);
      eventBus.subscribe('product.created', workingHandler);

      const event = new ProductCreated('123', 'Test Product', 99.99);
      
      // Should not throw despite handler error
      await expect(eventBus.publish(event)).resolves.not.toThrow();

      expect(errorHandler.handle).toHaveBeenCalled();
      expect(workingHandler.handle).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('utility methods', () => {
    it('should return correct handler count', () => {
      expect(eventBus.getHandlerCount('product.created')).toBe(0);

      const handler1: EventHandler<ProductCreated> = { handle: jest.fn() };
      const handler2: EventHandler<ProductCreated> = { handle: jest.fn() };

      eventBus.subscribe('product.created', handler1);
      expect(eventBus.getHandlerCount('product.created')).toBe(1);

      eventBus.subscribe('product.created', handler2);
      expect(eventBus.getHandlerCount('product.created')).toBe(2);
    });

    it('should clear all handlers', () => {
      const handler: EventHandler<ProductCreated> = { handle: jest.fn() };
      
      eventBus.subscribe('product.created', handler);
      eventBus.subscribe('product.stock_changed', handler);
      
      expect(eventBus.getHandlerCount('product.created')).toBe(1);
      expect(eventBus.getHandlerCount('product.stock_changed')).toBe(1);

      eventBus.clear();

      expect(eventBus.getHandlerCount('product.created')).toBe(0);
      expect(eventBus.getHandlerCount('product.stock_changed')).toBe(0);
    });
  });
});
