import { Controller, Post, Body, Get, Param, Patch, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { EntregadorService } from './entregador.service';
import { CreateEntregadorDto } from './dto/create-entregador.dto';
import { EntregadorResponseDto } from './dto/entregadorResponseDto';

@Controller('entregadores')
export class EntregadorController {
  constructor(private readonly entregadorService: EntregadorService) {}

  @Post()
  async create(@Body() createEntregadorDto: CreateEntregadorDto): Promise<EntregadorResponseDto> {
    const entregador = await this.entregadorService.create(createEntregadorDto);
    return {
      id: entregador.id,
      nome: entregador.nome,
      telefone: entregador.telefone,
      veiculo: entregador.veiculo,
      placa: entregador.placa,
      email: entregador.email,
    };
  }

  @Get()
  async findAll(): Promise<EntregadorResponseDto[]> {
    const entregadores = await this.entregadorService.findAll();
    return entregadores.map((entregador) => ({
      id: entregador.id,
      nome: entregador.nome,
      telefone: entregador.telefone,
      veiculo: entregador.veiculo,
      placa: entregador.placa,
      email: entregador.email,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<EntregadorResponseDto> {
    const entregador = await this.entregadorService.findOne(id);
    return {
      id: entregador.id,
      nome: entregador.nome,
      telefone: entregador.telefone,
      veiculo: entregador.veiculo,
      placa: entregador.placa,
      email: entregador.email,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEntregadorDto: CreateEntregadorDto,
  ): Promise<EntregadorResponseDto> {
    const entregador = await this.entregadorService.update(id, updateEntregadorDto);
    return {
      id: entregador.id,
      nome: entregador.nome,
      telefone: entregador.telefone,
      veiculo: entregador.veiculo,
      placa: entregador.placa,
      email: entregador.email,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.entregadorService.remove(id);
  }
}