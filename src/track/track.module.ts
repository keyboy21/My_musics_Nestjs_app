import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { FileService } from '../file/file.service';
import { PrismaService } from '../services/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [TrackController],
  providers: [TrackService, PrismaService, FileService],
})
export class TrackModule {}
