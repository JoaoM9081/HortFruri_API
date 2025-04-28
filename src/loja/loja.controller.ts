import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { LojaService } from './loja.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { LojaResponseDto } from './dto/LojaResponseDto';

@Controller('lojas')
export class LojaController {
  constructor(private readonly lojaService: LojaService) {}

  @Post()
  async create(
    @Param('usuarioId') usuarioId: number,
    @Param('enderecoId') enderecoId: number,
    @Body() createLojaDto: CreateLojaDto,
  ): Promise<LojaResponseDto> {
    const loja = await this.lojaService.create(usuarioId, enderecoId, createLojaDto);
    return {
      id: loja.id,
      nome: loja.nome,
      cnpj: loja.cnpj,
      telefone: loja.telefone,
    };
  }

  @Get()
  async findAll(): Promise<LojaResponseDto[]> {
    const lojas = await this.lojaService.findAll();
    return lojas.map((loja) => ({
      id: loja.id,
      nome: loja.nome,
      cnpj: loja.cnpj,
      telefone: loja.telefone,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<LojaResponseDto> {
    const loja = await this.lojaService.findOne(id);
    return {
      id: loja.id,
      nome: loja.nome,
      cnpj: loja.cnpj,
      telefone: loja.telefone,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLojaDto: Partial<CreateLojaDto>,
  ): Promise<LojaResponseDto> {
    const loja = await this.lojaService.update(id, updateLojaDto);
    return {
      id: loja.id,
      nome: loja.nome,
      cnpj: loja.cnpj,
      telefone: loja.telefone,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.lojaService.remove(id);
  }

  @Get('nome/:nome')
  async findByName(@Param('nome') nome: string): Promise<LojaResponseDto> {
    const loja = await this.lojaService.findByName(nome);
    return {
      id: loja.id,
      nome: loja.nome,
      cnpj: loja.cnpj,
      telefone: loja.telefone,
    };
  }
}