export abstract class DomainEvent {
  public readonly occurredOn: Date;
  public readonly eventId: string;

  constructor() {
    this.occurredOn = new Date();
    this.eventId = this.generateId();
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  abstract getEventName(): string;
}

export class ProductCreated extends DomainEvent {
  constructor(
    public readonly productId: string,
    public readonly productName: string,
    public readonly price: number,
  ) {
    super();
  }

  getEventName(): string {
    return 'product.created';
  }
}

export class ProductUpdated extends DomainEvent {
  constructor(
    public readonly productId: string,
    public readonly changes: Record<string, any>,
  ) {
    super();
  }

  getEventName(): string {
    return 'product.updated';
  }
}

export class StockChanged extends DomainEvent {
  constructor(
    public readonly productId: string,
    public readonly oldStock: number,
    public readonly newStock: number,
    public readonly changeType: 'increase' | 'decrease',
  ) {
    super();
  }

  getEventName(): string {
    return 'product.stock_changed';
  }
}
