import { Injectable, BadRequestException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { FileService, FileType } from '../file/file.service';
import { Track as trackModel } from '@prisma/client';
import { CreateTrackDto } from './Dto/create-track.dto';

@Injectable()
export class TrackService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async create(trackDto: CreateTrackDto, picture, audio): Promise<trackModel> {
    const { name, artist, author, text_music } = trackDto;
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

    return await this.prisma.track.create({
      data: {
        name,
        artist,
        text_music,
        author: { connect: { id: author } },
        audio: audioPath,
        picture: picturePath,
      },
    });
  }

  async getAll(): Promise<trackModel[]> {
    return await this.prisma.track.findMany({});
  }

  async getById(id: string): Promise<trackModel> {
    return await this.prisma.track.findUnique({
      where: { id },
    });
  }

  async delete(data): Promise<HttpStatus> {
    const { trackId, authorId } = data;

    const Track = await this.prisma.track.findUnique({
      where: { id: trackId },
    });

    if (Track.authorId !== authorId) {
      throw new BadRequestException('You are not author of this track');
    }

    const deletedTrack = await this.prisma.track.delete({
      where: { id: trackId },
    });

    if (deletedTrack) {
      const pic = await this.fileService.removeFile(deletedTrack.picture);
      const audi = await this.fileService.removeFile(deletedTrack.audio);

      if (pic && audi) {
        return HttpStatus.OK;
      }
    }
  }

  async listen(id: string): Promise<trackModel> {
    const track = await this.prisma.track.findUnique({ where: { id } });
    track.listens += 1;
    return await this.prisma.track.update({
      where: { id },
      data: { listens: track.listens },
    });
  }
}
