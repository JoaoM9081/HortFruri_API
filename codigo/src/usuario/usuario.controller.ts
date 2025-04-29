import { Controller, Post, Body, Get, Param, Patch, Delete, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuarioResponseDto } from './dto/usuarioResponseDto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<UsuarioResponseDto> {
    const usuario = await this.usuarioService.create(createUsuarioDto);
    return {
      id: usuario.id,
      email: usuario.email,
      papel: usuario.papel,
    };
  }

  @Get()
  async findAll(): Promise<UsuarioResponseDto[]> {
    const usuarios = await this.usuarioService.findAll();
    return usuarios.map(usuario => ({
      id: usuario.id,
      email: usuario.email,
      papel: usuario.papel,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UsuarioResponseDto> {
    const usuario = await this.usuarioService.findOne(id);
    return {
      id: usuario.id,
      email: usuario.email,
      papel: usuario.papel,
    };
  }

  @Put(':id')  // Alterado de PATCH para PUT
  async update(
    @Param('id') id: number,
    @Body() updateUsuarioDto: CreateUsuarioDto,  // Recebe os dados completos para atualização
  ): Promise<UsuarioResponseDto> {
    const usuario = await this.usuarioService.update(id, updateUsuarioDto);  // Chama o serviço para atualizar
    return {
      id: usuario.id,
      email: usuario.email,
      papel: usuario.papel,
    };
  }
  
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.usuarioService.remove(id);
  }
}