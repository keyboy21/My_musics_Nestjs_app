import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'Nice music', description: 'Comment' })
  @IsString({ message: 'Must be a string' })
  readonly text: string;

  @ApiProperty({ example: '6299f4bd62fa8a86265d6493', description: 'Track Id' })
  @IsMongoId({ message: 'Must be a valid mongo id' })
  readonly trackId: string;

  @ApiProperty({ example: '6299f4bd62fa8a86265d6493', description: 'User Id' })
  @IsMongoId({ message: 'Must be a valid mongo id' })
  readonly usernameId: string;
}
