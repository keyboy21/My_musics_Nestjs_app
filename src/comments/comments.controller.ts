import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  BadRequestException,
  Param,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt.auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { Comment as commentModel } from '@prisma/client';
import { CreateCommentDto } from './Dto/creat-comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Comment created' })
  @HttpCode(HttpStatus.OK)
  @Post('/create')
  async addComment(
    @Body() commentDto: CreateCommentDto,
  ): Promise<commentModel | BadRequestException> {
    if (!commentDto.text) {
      throw new BadRequestException('Missing comment text ');
    }

    if (!commentDto.trackId) {
      throw new BadRequestException('Missing track id');
    }

    if (!commentDto.usernameId) {
      throw new BadRequestException('Missing username id');
    }

    return this.commentsService.createComment(commentDto);
  }

  @ApiOperation({ summary: 'Get track comments' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Track comment' })
  @HttpCode(HttpStatus.OK)
  @Get(':commentId')
  async getCommentsMusic(@Param('id') id: string): Promise<commentModel[]> {
    return this.commentsService.getCommentsMusic(id);
  }
}
