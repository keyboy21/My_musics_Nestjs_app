import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TrackModule } from './track/track.module';
import { CommentsModule } from './comments/comments.module';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { HealthModule } from './health/health.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    AuthModule,
    TrackModule,
    CommentsModule,
    UserModule,
    FileModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
