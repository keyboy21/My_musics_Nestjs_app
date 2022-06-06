import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ValidationPipe } from '../pipes/validation.pipe';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';

import { CreateUserDto } from './Dto/create-userd.dto';
import { LoginUserDto } from './Dto/login-user.dto';
import { User as userModel } from '@prisma/client';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User created',
  })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async loginUser(
    @Body() loginUser: LoginUserDto,
  ): Promise<object | BadRequestException> {
    return this.authService.loginUser(loginUser);
  }

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
  })
  @Post('/register')
  @UseGuards(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async createUser(
    @Body() createUser: CreateUserDto,
  ): Promise<userModel | BadRequestException> {
    if (!createUser.email || !createUser.password || !createUser.username) {
      return new BadRequestException(
        'Please provide email, password and username',
      );
    }
    return this.authService.createUser(createUser);
  }
}
