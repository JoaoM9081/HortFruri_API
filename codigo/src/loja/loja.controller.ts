import { Controller, Post, Body, Get, Param, Patch, Delete, Put } from '@nestjs/common';
import { LojaService } from './loja.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { LojaResponseDto } from './dto/LojaResponseDto';

@Controller('lojas')
export class LojaController {
  constructor(private readonly lojaService: LojaService) {}

  @Post()
  async create(
    @Body() createLojaDto: CreateLojaDto,
  ): Promise<LojaResponseDto> {
    const loja = await this.lojaService.create(createLojaDto);
    return {
      id: loja.id,
      nome: loja.nome,
      cnpj: loja.cnpj,
      telefone: loja.telefone,
      email: loja.email,  // Incluindo email na resposta
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
      email: loja.email,  // Incluindo email na resposta
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
      email: loja.email,  // Incluindo email na resposta
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLojaDto: CreateLojaDto,
  ): Promise<LojaResponseDto> {
    const loja = await this.lojaService.update(id, updateLojaDto);
    return {
      id: loja.id,
      nome: loja.nome,
      cnpj: loja.cnpj,
      telefone: loja.telefone,
      email: loja.email,  // Incluindo email na resposta
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.lojaService.remove(id);
  }

  @Get(':nome')
  async findByName(@Param('nome') nome: string): Promise<LojaResponseDto> {
    const loja = await this.lojaService.findByName(nome);
    return {
      id: loja.id,
      nome: loja.nome,
      cnpj: loja.cnpj,
      telefone: loja.telefone,
      email: loja.email,  // Incluindo email na resposta
    };
  }
}