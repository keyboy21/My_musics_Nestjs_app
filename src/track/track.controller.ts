import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TrackService } from './track.service';
import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';

import { Track as trackModel } from '@prisma/client';

@ApiTags('Track')
@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create Track' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Track created' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrack: trackModel): Promise<string> {
    return this.trackService.create(createTrack);
  }

  @ApiOperation({ summary: 'Get All tracks' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Tracks found' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(): Promise<object[]> {
    return this.trackService.getAll();
  }

  @ApiOperation({ summary: 'Get one track' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Track founded' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<trackModel> {
    return this.trackService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete track' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Track deleted' })
  @Delete()
  @HttpCode(HttpStatus.OK)
  async delete(
    @Body() data: { trackId: string; authorId: string },
  ): Promise<trackModel | BadRequestException> {
    return this.trackService.delete(data);
  }
}
