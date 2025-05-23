import { Controller, Post, Body, Get, Param, Patch, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { LojaService } from './loja.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { LojaResponseDto } from './dto/LojaResponseDto';
import { UpdateLojaDto } from './dto/update-loja.dto';

@Controller('lojas')
export class LojaController {
  constructor(private readonly lojaService: LojaService) {}

  @Post()
  async create(
    @Body() dto: CreateLojaDto,
  ): Promise<LojaResponseDto> {
    const loja = await this.lojaService.create(dto);
    return this.toResponse(loja);
  }

  @Get()
  async findAll(): Promise<LojaResponseDto[]> {
    const lojas = await this.lojaService.findAll();
    return lojas.map(l => this.toResponse(l));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LojaResponseDto> {
    const loja = await this.lojaService.findOne(id);
    return this.toResponse(loja);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateLojaDto,
  ): Promise<LojaResponseDto> {
    const loja = await this.lojaService.update(id, dto);
    return this.toResponse(loja);
  }

   @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.lojaService.remove(id);
  }

  private toResponse(loja: any): LojaResponseDto {
    return {
      id: loja.id,
      nome: loja.nome,
      cnpj: loja.cnpj,
      telefone: loja.telefone,
      email: loja.email,
      endereco: {
        id:        loja.endereco.id,
        rua:       loja.endereco.rua,
        numero:    loja.endereco.numero,
        complemento: loja.endereco.complemento,
        cidade:    loja.endereco.cidade,
        cep:       loja.endereco.cep,
      },
    };
  }
}