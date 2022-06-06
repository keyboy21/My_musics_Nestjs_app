import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TrackModule } from './track/track.module';
import { CommentsModule } from './comments/comments.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    AuthModule,
    TrackModule,
    CommentsModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
