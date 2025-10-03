import { Controller, Get, Post, Put, Patch, Delete, Body, Param, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUser } from '../../../application/use-cases/CreateUser';
import { GetAllUsers } from '../../../application/use-cases/GetAllUsers';
import { GetUserById } from '../../../application/use-cases/GetUserById';
import { UpdateUser } from '../../../application/use-cases/UpdateUser';
import { DeleteUser } from '../../../application/use-cases/DeleteUser';
import { ActivateUser } from '../../../application/use-cases/ActivateUser';
import { DeactivateUser } from '../../../application/use-cases/DeactivateUser';
import { CreateUserDTO } from '../../../application/dtos/CreateUserDTO';
import { UpdateUserDTO } from '../../../application/dtos/UpdateUserDTO';
import { UserResponseDTO } from '../../../application/dtos/UserResponseDTO';
import { DomainError } from '../../../domain/errors/DomainError';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly getAllUsers: GetAllUsers,
    private readonly getUserById: GetUserById,
    private readonly updateUser: UpdateUser,
    private readonly deleteUser: DeleteUser,
    private readonly activateUser: ActivateUser,
    private readonly deactivateUser: DeactivateUser,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateUserDTO): Promise<UserResponseDTO> {
    try {
      const user = await this.createUser.execute(dto);
      return UserResponseDTO.fromDomain(user);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get()
  async findAll(): Promise<UserResponseDTO[]> {
    try {
      const users = await this.getAllUsers.execute();
      return users.map(u => UserResponseDTO.fromDomain(u));
    } catch (error) {
      this.handleError(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDTO> {
    try {
      const user = await this.getUserById.execute(id);
      return UserResponseDTO.fromDomain(user);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDTO): Promise<UserResponseDTO> {
    try {
      const user = await this.updateUser.execute(id, dto);
      return UserResponseDTO.fromDomain(user);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Patch(':id/activate')
  async activate(@Param('id') id: string): Promise<UserResponseDTO> {
    try {
      const user = await this.activateUser.execute(id);
      return UserResponseDTO.fromDomain(user);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: string): Promise<UserResponseDTO> {
    try {
      const user = await this.deactivateUser.execute(id);
      return UserResponseDTO.fromDomain(user);
    } catch (error) {
      this.handleError(error);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.deleteUser.execute(id);
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
