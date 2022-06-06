import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

import { User as userModel } from '@prisma/client';
import { CreateUserDto } from './Dto/create-userd.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async loginUser(
    @Body() loginUser: userModel,
  ): Promise<object | BadRequestException> {
    return this.authService.loginUser(loginUser);
  }

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
  })
  @Post('/register')
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
