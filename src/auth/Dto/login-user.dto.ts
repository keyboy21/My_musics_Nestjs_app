import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Must be a valid email' })
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'password' })
  @IsString({ message: 'Must be string' })
  @Length(4, 16, { message: 'Must be between 4 and 16 characters' })
  readonly password: string;
}
