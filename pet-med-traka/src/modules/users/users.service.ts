import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto, UpdateUserDto, PaginationParams } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    // Additional business logic can go here
    return this.usersRepository.create(createUserDto);
  }

  async getUserById(id: string) {
    return this.usersRepository.findById(id);
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async deleteUser(id: string) {
    return this.usersRepository.delete(id);
  }

  async getAllActiveUsers() {
    return this.usersRepository.findAllActive();
  }

  async getUsersByRole(role: string) {
    return this.usersRepository.findByRole(role);
  }

  async getUsersWithPagination(params: PaginationParams) {
    return this.usersRepository.findAllPaginated(params);
  }
}
