export class ProductResponseDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromDomain(product: any): ProductResponseDTO {
    return new ProductResponseDTO(
      product.id,
      product.name,
      product.description,
      product.price,
      product.stock,
      product.createdAt,
      product.updatedAt,
    );
  }
}
