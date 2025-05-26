import { Strategy }         from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService }      from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }
  async validate(email: string, pass: string) {
    const u = await this.auth.validateUser(email, pass);
    if (!u) throw new UnauthorizedException();
    return u;
  }
}
