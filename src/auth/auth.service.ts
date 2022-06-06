import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { User as userModel } from '@prisma/client';
import { CreateUserDto } from './Dto/create-userd.dto';
import { LoginUserDto } from './Dto/login-user.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async loginUser(
    userDto: LoginUserDto,
  ): Promise<object | BadRequestException> {
    const User = await this.validateUser(userDto);

    return await this.generateToken(User);
  }

  async createUser(
    userDto: CreateUserDto,
  ): Promise<userModel | BadRequestException> {
    const emailExsist = await this.prisma.user.findUnique({
      where: { email: userDto.email },
    });

    if (emailExsist) {
      return new BadRequestException('User with this email already exist');
    }
    const username = await this.prisma.user.findUnique({
      where: { username: userDto.username },
    });

    if (username) {
      return new BadRequestException('User with this username already exist');
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 15);

    const user = await this.prisma.user.create({
      data: {
        username: userDto.username,
        email: userDto.email,
        password: hashedPassword,
      },
    });

    return user;
  }

  private async generateToken(user: userModel) {
    const payload = {
      username: user.username,
      useremail: user.email,
      userId: user.id,
    };
    return {
      token: await this.jwtService.sign(payload),
    };
  }

  private async validateUser(user: LoginUserDto) {
    if (!user.email) {
      throw new BadRequestException('Email is required');
    }

    if (!user.password) {
      throw new BadRequestException('Password is required');
    }

    const userExsist = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!userExsist) {
      throw new UnauthorizedException(
        'User with this email not exist, Please register',
      );
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      userExsist.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    return userExsist;
  }
}
