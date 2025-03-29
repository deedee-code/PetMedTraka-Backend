import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../../database/schemas/user.schema';
import { CreateUserDto, UpdateUserDto, PaginationParams } from './users.dto';
import { CustomLogger } from '../../logger/logger.service';

@Injectable()
export class UsersRepository {
  private readonly logger: CustomLogger;

  constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {
    this.logger = new CustomLogger();
  }

  // CRUD Operations
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`Error updating user: ${errorMessage}`, errorStack);
      throw error;
    }
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    try {
      return this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Error updating user ${id}: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  // Query Operations
  async findAllActive(): Promise<User[]> {
    return this.userModel.find({ isActive: true }).exec();
  }

  async findByRole(role: string): Promise<User[]> {
    return this.userModel.find({ role }).exec();
  }

  // Pagination Support
  async findAllPaginated({
    page,
    limit,
  }: PaginationParams): Promise<{ users: User[]; total: number }> {
    const [users, total] = await Promise.all([
      this.userModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.userModel.countDocuments().exec(),
    ]);

    return { users, total };
  }

  // Transaction Support
  async withTransaction<T>(fn: (session: any) => Promise<T>): Promise<T> {
    const session = await this.userModel.db.startSession();
    let result: T;

    try {
      await session.withTransaction(async () => {
        result = await fn(session);
      });
      return result;
    } finally {
      await session.endSession();
    }
  }
}
