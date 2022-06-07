import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { LoginUserDto } from '../Dto/login-user.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(userDto: LoginUserDto): Promise<any> {
    const user = await this.authService.loginUser(userDto);
    return user;
  }
}
