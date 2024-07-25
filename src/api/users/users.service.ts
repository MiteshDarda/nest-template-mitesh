import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { PasswordTransformer } from 'src/utils/class-transformer/password-transformer';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly passwordTransformer: PasswordTransformer,
  ) {}

  //* ========================================== CREATE USER ==========================================
  /**
   * Create a new user
   */
  async create(createUserDto: CreateUserDto) {
    try {
      console.log(createUserDto);
      const user = await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(createUserDto)
        .execute();
      console.log(user);
      return 'This action adds a new user';
    } catch (error) {
      if (error?.code === '23505') {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //* ========================================== Login ==========================================
  async login(loginDto: LoginDto) {
    try {
      const user = await this.userRepository
        .createQueryBuilder()
        .where('email = :email', { email: loginDto.email })
        .getOne();
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      console.log(user);
      console.log(
        this.passwordTransformer.isPasswordValid(
          loginDto.password,
          user.password,
        ),
      );
      if (
        !this.passwordTransformer.isPasswordValid(
          loginDto.password,
          user.password,
        )
      ) {
        throw new HttpException(
          'Password is incorrect',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return 'Login successful';
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
