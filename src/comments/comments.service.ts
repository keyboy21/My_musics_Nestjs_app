import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { Comment as commentModel } from '@prisma/client';
import { CreateCommentDto } from './Dto/creat-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}
  async createComment(commentDto: CreateCommentDto): Promise<commentModel> {
    const checkTrackId = await this.prisma.track.findUnique({
      where: { id: commentDto.trackId },
    });

    if (!checkTrackId) {
      throw new BadRequestException('Track not found');
    }

    const checkUserId = await this.prisma.user.findUnique({
      where: { id: commentDto.usernameId },
    });

    if (!checkUserId) {
      throw new BadRequestException('User not found');
    }
    return this.prisma.comment.create({
      data: {
        text: commentDto.text,
        trackId: checkTrackId.id,
        usernameId: checkUserId.id,
      },
    });
  }

  async getCommentsMusic(id: string): Promise<commentModel[]> {
    return this.prisma.comment.findMany({ where: { trackId: id } });
  }
}
