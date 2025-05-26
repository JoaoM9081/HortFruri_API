// src/auth/auth.module.ts
import { Module }             from '@nestjs/common';
import { PassportModule }     from '@nestjs/passport';
import { JwtModule }          from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService }        from './auth.service';
import { AuthController }     from './auth.controller';
import { LocalStrategy } from './local/LocalStrategy';
import { JwtStrategy } from './jwt/JwtStrategy';
import { UsuarioModule }      from 'src/usuario/usuario.module';

@Module({
  imports: [
    ConfigModule,           // já global
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        secret: cs.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: cs.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
    UsuarioModule,           // para injetar UsuarioService
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
