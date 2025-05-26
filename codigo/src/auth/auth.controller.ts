// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Get,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response }  from 'express';
import { AuthService }        from './auth.service';
import { CreateAuthDto }      from './dto/create-auth.dto';
import { LocalAuthGuard } from './guards/LocalAuthGuard';
import { JwtAuthGuard } from './guards/JwtAuthGuard';
import { UsuarioService }     from 'src/usuario/usuario.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiCookieAuth,
} from '@nestjs/swagger';

interface RequestWithUser extends Request {
  user: { id: number; email: string; role: string };
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login com e-mail e senha' })
  @ApiBody({ type: CreateAuthDto })
  @ApiResponse({ status: 200, schema: { example: { success: true } } })
  async login(
    @Req() req: RequestWithUser,
    @Res({ passthrough: true }) res: Response,
  ) {
    // passport-local populou req.user
    const { access_token } = await this.authService.login(req.user);
    res.cookie('Authentication', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1_200_000, // 20 minutos
    });
    return { success: true };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Logout (remove cookie)' })
  @ApiResponse({ status: 200, schema: { example: { success: true } } })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('Authentication');
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Retorna dados do usuário logado' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        email: 'joao@exemplo.com',
        role: 'consumidor'
      }
    }
  })
  async me(@Req() req: RequestWithUser) {
    const u = await this.usuarioService.findByEmail(req.user.email);
    return { id: u.id, email: u.email, role: u.role };
  }
}