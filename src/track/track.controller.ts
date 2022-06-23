import { TrackService } from './track.service';
import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  BadRequestException,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { Track as trackModel } from '@prisma/client';
import { CreateTrackDto } from './Dto/create-track.dto';

@ApiTags('Track')
@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create Track' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Track created' })
  @HttpCode(HttpStatus.CREATED)
  @Post('/create')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  async create(
    @UploadedFiles()
    files,
    @Body() createTrack: CreateTrackDto,
  ) {
    const { picture, audio } = files;
    return this.trackService.create(createTrack, picture[0], audio[0]);
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
  @Get(':trackId')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<trackModel> {
    return this.trackService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete track' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Track deleted' })
  @HttpCode(HttpStatus.OK)
  @Delete()
  async delete(
    @Body() data: { trackId: string; authorId: string },
  ): Promise<HttpStatus | BadRequestException> {
    return this.trackService.delete(data);
  }

  @ApiOperation({ summary: 'Listened' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Track listened' })
  @HttpCode(HttpStatus.OK)
  @Post('/listen/:trackId')
  async listen(@Param('id') id: string) {
    return this.trackService.listen(id);
  }
}
