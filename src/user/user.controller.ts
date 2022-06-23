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
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';

import { Track as trackModel } from '@prisma/client';

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
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/addToFavourite')
  async addToFavourite(
    @Body() data: { trackId: string; userId: string },
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
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getFavourite(@Param('id') id: string): Promise<object> {
    return this.userService.getMyFavouriteMusics(id);
  }

  @ApiOperation({ summary: 'Get my favourite musics' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Delete from favourite' })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('/deleteAtFavourite')
  async deleteAtFavourite(
    @Body() data: { userId: string; trackId: string },
  ): Promise<trackModel | BadRequestException> {
    return this.userService.deleteAtFavourite(data);
  }
}
