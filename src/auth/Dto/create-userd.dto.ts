import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Must be a string' })
  @ApiProperty({ example: 'John', description: 'Name' })
  readonly username: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'Mail' })
  @IsString({ message: 'Must be a string' })
  @IsEmail({}, { message: 'Must be a mail' })
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'password' })
  @IsString({ message: 'Must be string' })
  @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
  readonly password: string;
}
