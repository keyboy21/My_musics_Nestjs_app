import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { Track as trackModel } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(trackDto: trackModel) {
    const { name, artist } = trackDto;
    return await 'track created';
  }

  async getAll(): Promise<object[]> {
    return await this.prisma.track.findMany({
      select: {
        id: true,
        name: true,
        listens: true,
        picture: true,
        artist: true,
        audio: true,
      },
    });
  }

  async getById(id: string): Promise<trackModel> {
    return await this.prisma.track.findUnique({
      where: { id },
    });
  }

  async delete(id: string): Promise<trackModel> {
    return await this.prisma.track.delete({ where: { id } });
  }
}
