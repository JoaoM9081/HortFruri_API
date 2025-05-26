import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService }       from '@nestjs/jwt';
import * as bcrypt          from 'bcrypt';
import { UsuarioService }   from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private users: UsuarioService,
    private jwt: JwtService,
  ) {}

  async validateUser(email: string, plain: string) {
    const user = await this.users.findByEmail(email);
    if (!await bcrypt.compare(plain, user.password)) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return { access_token: this.jwt.sign(payload) };
  }
}
