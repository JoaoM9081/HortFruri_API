import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ConsumidorService } from './consumidor.service';
import { CreateConsumidorDto } from './dto/create-consumidor.dto';
import { ConsumidorResponseDto } from './dto/consumidorResponseDto';

@Controller('consumidores')
export class ConsumidorController {
  constructor(private readonly consumidorService: ConsumidorService) {}

  @Post()
  async create(
    @Param('usuarioId') usuarioId: number,
    @Body() dto: CreateConsumidorDto,
  ): Promise<ConsumidorResponseDto> {
    const consumidor = await this.consumidorService.create(usuarioId, dto);
    return {
      id: consumidor.id,
      nome: consumidor.nome,
      telefone: consumidor.telefone,
    };
  }

  @Get()
  async findAll(): Promise<ConsumidorResponseDto[]> {
    const consumidores = await this.consumidorService.findAll();
    return consumidores.map((consumidor) => ({
      id: consumidor.id,
      nome: consumidor.nome,
      telefone: consumidor.telefone,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ConsumidorResponseDto> {
    const consumidor = await this.consumidorService.findOne(id);
    return {
      id: consumidor.id,
      nome: consumidor.nome,
      telefone: consumidor.telefone,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: Partial<CreateConsumidorDto>,
  ): Promise<ConsumidorResponseDto> {
    const consumidor = await this.consumidorService.update(id, dto);
    return {
      id: consumidor.id,
      nome: consumidor.nome,
      telefone: consumidor.telefone,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.consumidorService.remove(id);
  }
}