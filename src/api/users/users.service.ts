import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { PasswordTransformer } from 'src/utils/class-transformer/password-transformer';
import { LoginDto } from './dto/login.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtLoginType } from 'src/auth/jwt-param.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly passwordTransformer: PasswordTransformer,
    private readonly authService: AuthService,
  ) {}

  //* ========================================== CREATE USER ==========================================
  /**
   * Create a new user
   */
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(createUserDto)
        .execute();
      const { accessToken } = this.authService.login({
        userId: user.identifiers[0].id,
        email: createUserDto.email,
        role: createUserDto.role,
      } as JwtLoginType);
      return {
        message: 'User created successfully',
        accessToken,
      };
    } catch (error) {
      console.error(error);
      if (error?.code === '23505') {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
      throw error;
    }
  }

  //* ========================================== Login ==========================================
  /**
   * Login a user
   */
  async login(loginDto: LoginDto) {
    try {
      const user = await this.userRepository
        .createQueryBuilder()
        .where('email = :email', { email: loginDto.email })
        .getOne();
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const isPasswordValid = this.passwordTransformer.isPasswordValid(
        loginDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new HttpException(
          'Password is incorrect',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const { accessToken } = this.authService.login({
        userId: user.id,
        email: user.email,
        role: user.role,
      } as JwtLoginType);
      return {
        message: 'Login successful',
        accessToken,
      };
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
