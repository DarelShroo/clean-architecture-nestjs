import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductEntity } from '../../adapters/db/entities/ProductEntity';
import { UserEntity } from '../../adapters/db/entities/UserEntity';

export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'cleanarch_db',
  entities: [ProductEntity, UserEntity],
  synchronize: true, // Set to false in production
  logging: process.env.NODE_ENV === 'development',
});
