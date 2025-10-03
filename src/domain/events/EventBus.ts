import { DomainEvent } from './DomainEvent';

export interface EventHandler<T extends DomainEvent> {
  handle(event: T): Promise<void>;
}

export interface EventBus {
  publish(event: DomainEvent): Promise<void>;
  subscribe<T extends DomainEvent>(
    eventName: string,
    handler: EventHandler<T>,
  ): void;
}

export class InMemoryEventBus implements EventBus {
  private handlers: Map<string, EventHandler<any>[]> = new Map();

  async publish(event: DomainEvent): Promise<void> {
    const eventHandlers = this.handlers.get(event.getEventName()) || [];
    
    const promises = eventHandlers.map(handler => {
      try {
        return handler.handle(event);
      } catch (error) {
        console.error(`Error handling event ${event.getEventName()}:`, error);
        return Promise.resolve();
      }
    });

    await Promise.all(promises);
  }

  subscribe<T extends DomainEvent>(
    eventName: string,
    handler: EventHandler<T>,
  ): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    
    this.handlers.get(eventName)!.push(handler);
  }

  getHandlerCount(eventName: string): number {
    return this.handlers.get(eventName)?.length || 0;
  }

  clear(): void {
    this.handlers.clear();
  }
}
