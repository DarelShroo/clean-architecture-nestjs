import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../../adapters/db/entities/ProductEntity';
import { TypeOrmProductRepository } from '../../adapters/db/repositories/TypeOrmProductRepository';
import { ProductController } from '../../adapters/api/controllers/ProductController';
import { CreateProduct } from '../../application/use-cases/CreateProduct';
import { GetAllProducts } from '../../application/use-cases/GetAllProducts';
import { GetProductById } from '../../application/use-cases/GetProductById';
import { UpdateProduct } from '../../application/use-cases/UpdateProduct';
import { DeleteProduct } from '../../application/use-cases/DeleteProduct';
import { IncreaseStock } from '../../application/use-cases/IncreaseStock';
import { DecreaseStock } from '../../application/use-cases/DecreaseStock';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [
    {
      provide: 'IProductRepository',
      useClass: TypeOrmProductRepository,
    },
    CreateProduct,
    GetAllProducts,
    GetProductById,
    UpdateProduct,
    DeleteProduct,
    IncreaseStock,
    DecreaseStock,
  ],
})
export class ProductModule {}
