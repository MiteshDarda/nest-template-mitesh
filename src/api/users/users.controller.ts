import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Role } from 'src/roles/roles.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //* ========================================== CREATE USER ==========================================
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  //* ========================================== Login ==========================================
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  //* ========================================== ME ==========================================
  @Roles([Role.All])
  @UseGuards(PassportAuthGuard('jwt'))
  @UseGuards(RolesGuard)
  @Get('me')
  me() {
    return 'This action returns a user';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('id', id);
    // return this.usersService.findOne(+id);
  }
}
