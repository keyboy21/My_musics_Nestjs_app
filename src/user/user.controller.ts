import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  BadRequestException,
  Param,
  Put,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';

import { User as userModel, Track as trackModel } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users found',
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/getAllUsers')
  async getAllUsers(): Promise<object[]> {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Add to my favourite musics' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tracks found',
  })
  // @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/addToFavourite')
  async addToFavourite(
    @Body() data: { trackid: string; userid: string },
  ): Promise<object | BadRequestException> {
    if (!data) {
      return new BadRequestException('trackId or userId is required');
    }

    return this.userService.addToFavourite(data);
  }

  @ApiOperation({ summary: 'Get my favourite musics' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tracks found',
  })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getFavourite(@Param('id') id: string): Promise<object> {
    return this.userService.getMyFavouriteMusics(id);
  }
}
