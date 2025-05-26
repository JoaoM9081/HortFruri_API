import { Body, Controller, Post } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateAdminDto } from "./dto/createAdminDto";


@Controller('users')
export class UsuarioController {
  constructor(private readonly users: UsuarioService) {}

  @Post('registerAdmin')
  @ApiOperation({ summary: 'Registrar usuário (role=admin)' })
  @ApiResponse({ status: 201, description: 'Admin criado.' })
  @ApiBody({ type:  CreateAdminDto})
  registerAdmin(@Body() dto: CreateAdminDto) {
    return this.users.createAdmin(dto.email, dto.password, 'admin');
  }
}