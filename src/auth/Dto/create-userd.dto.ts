import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 'John', description: 'Name' })
  readonly username: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'Gmail' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Must be a valid email' })
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'password' })
  @IsString({ message: 'Must be string' })
  @Length(4, 16, { message: 'Must be between 4 and 16 characters' })
  readonly password: string;
}
