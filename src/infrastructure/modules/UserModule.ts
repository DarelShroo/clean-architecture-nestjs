import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../adapters/db/entities/UserEntity';
import { TypeOrmUserRepository } from '../../adapters/db/repositories/TypeOrmUserRepository';
import { UserController } from '../../adapters/api/controllers/UserController';
import { CreateUser } from '../../application/use-cases/CreateUser';
import { GetAllUsers } from '../../application/use-cases/GetAllUsers';
import { GetUserById } from '../../application/use-cases/GetUserById';
import { UpdateUser } from '../../application/use-cases/UpdateUser';
import { DeleteUser } from '../../application/use-cases/DeleteUser';
import { ActivateUser } from '../../application/use-cases/ActivateUser';
import { DeactivateUser } from '../../application/use-cases/DeactivateUser';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: TypeOrmUserRepository,
    },
    CreateUser,
    GetAllUsers,
    GetUserById,
    UpdateUser,
    DeleteUser,
    ActivateUser,
    DeactivateUser,
  ],
})
export class UserModule {}
