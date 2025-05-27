import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateAdminDto } from "./dto/CreateAdminDto";
import { JwtAuthGuard } from "src/auth/guards/JwtAuthGuard";
import { RolesGuard } from "src/auth/roles/roles.guard";
import { Roles } from "src/auth/roles/roles.decorator";

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

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Retorna a lista de todos os usuários.',
  })
  findAll() {
    return this.users.findAll();
  }
}