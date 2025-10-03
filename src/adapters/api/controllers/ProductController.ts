import { Controller, Get, Post, Put, Patch, Delete, Body, Param, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { CreateProduct } from '../../../application/use-cases/CreateProduct';
import { GetAllProducts } from '../../../application/use-cases/GetAllProducts';
import { GetProductById } from '../../../application/use-cases/GetProductById';
import { UpdateProduct } from '../../../application/use-cases/UpdateProduct';
import { DeleteProduct } from '../../../application/use-cases/DeleteProduct';
import { IncreaseStock } from '../../../application/use-cases/IncreaseStock';
import { DecreaseStock } from '../../../application/use-cases/DecreaseStock';
import { CreateProductDTO } from '../../../application/dtos/CreateProductDTO';
import { UpdateProductDTO } from '../../../application/dtos/UpdateProductDTO';
import { UpdateStockDTO } from '../../../application/dtos/UpdateStockDTO';
import { ProductResponseDTO } from '../../../application/dtos/ProductResponseDTO';
import { DomainError } from '../../../domain/errors/DomainError';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProduct: CreateProduct,
    private readonly getAllProducts: GetAllProducts,
    private readonly getProductById: GetProductById,
    private readonly updateProduct: UpdateProduct,
    private readonly deleteProduct: DeleteProduct,
    private readonly increaseStock: IncreaseStock,
    private readonly decreaseStock: DecreaseStock,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateProductDTO): Promise<ProductResponseDTO> {
    try {
      const product = await this.createProduct.execute(dto);
      return ProductResponseDTO.fromDomain(product);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get()
  async findAll(): Promise<ProductResponseDTO[]> {
    try {
      const products = await this.getAllProducts.execute();
      return products.map(p => ProductResponseDTO.fromDomain(p));
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductResponseDTO> {
    try {
      const product = await this.getProductById.execute(id);
      return ProductResponseDTO.fromDomain(product);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProductDTO): Promise<ProductResponseDTO> {
    try {
      const product = await this.updateProduct.execute(id, dto);
      return ProductResponseDTO.fromDomain(product);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Patch(':id/increase-stock')
  async increaseStockEndpoint(@Param('id') id: string, @Body() dto: UpdateStockDTO): Promise<ProductResponseDTO> {
    try {
      const product = await this.increaseStock.execute(id, dto);
      return ProductResponseDTO.fromDomain(product);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Patch(':id/decrease-stock')
  async decreaseStockEndpoint(@Param('id') id: string, @Body() dto: UpdateStockDTO): Promise<ProductResponseDTO> {
    try {
      const product = await this.decreaseStock.execute(id, dto);
      return ProductResponseDTO.fromDomain(product);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.deleteProduct.execute(id);
    } catch (error) {
      this.handleError(error);
    }
  }


  private handleError(error: any): never {
    if (error instanceof DomainError) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
