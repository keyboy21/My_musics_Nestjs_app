import { Injectable, BadRequestException } from '@nestjs/common';

import { User as userModel, Track as trackModel } from '@prisma/client';

import { PrismaService } from '../services/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<object[]> {
    return await this.prisma.user.findMany({
      select: { id: true, username: true, email: true },
    });
  }

  async addToFavourite(data): Promise<object | BadRequestException> {
    const { trackId, userId } = data;

    const User = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!User) {
      return new BadRequestException('User not found');
    }

    // const user = await this.prisma.user.update({
    //   where: { id: userId },
    //   data: { myFavoriteMusics: { connect: { id: trackId } } },
    // });
    // const data = { userId, trackId };
    // return await this.prisma.user.update({
    //   where: { id: userId },
    //   data: { myFavoriteMusics: { connect: { id: trackId } } },
    // });

    return User;
  }

  async getMyFavouriteMusics(id: string): Promise<object> {
    return await this.prisma.user.findUnique({
      where: { id },
      select: { myFavoriteMusics: true, username: true },
    });
  }
}
