import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId } from 'class-validator';

export class CreateTrackDto {
  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 'John', description: 'Name' })
  readonly name: string;

  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 'Michael Jackson', description: 'Track creator' })
  readonly artist: string;

  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 'Michael Jackson', description: 'Text music' })
  readonly text_music: string;

  @ApiProperty({ example: 'Somemusic.mp3', description: 'Music' })
  readonly picture: File;

  @ApiProperty({ example: 'Author', description: 'AuthorId' })
  @IsMongoId({ message: 'Must be a valid mongo id' })
  readonly author: string;
}
