import { Controller, Post, Body, Get, Param, Patch, Delete, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ConsumidorService } from './consumidor.service';
import { CreateConsumidorDto } from './dto/create-consumidor.dto';
import { ConsumidorResponseDto } from './dto/consumidorResponseDto';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('consumidores')
export class ConsumidorController {
  constructor(private readonly consumidorService: ConsumidorService) {}

  @Post()
  async create(@Body() dto: CreateConsumidorDto): Promise<ConsumidorResponseDto> {
    const c = await this.consumidorService.create(dto);
    
    return { id: c.id, nome: c.nome, telefone: c.telefone, email: c.email };
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findAll(): Promise<ConsumidorResponseDto[]> {
    const consumidores = await this.consumidorService.findAll();
    return consumidores.map(consumidor => ({
      id: consumidor.id,
      nome: consumidor.nome,
      telefone: consumidor.telefone,
      email: consumidor.email,
    }));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'consumidor')
  async findOne(@Param('id') id: number): Promise<ConsumidorResponseDto> {
    const consumidor = await this.consumidorService.findOne(id);
    return {
      id: consumidor.id,
      nome: consumidor.nome,
      telefone: consumidor.telefone,
      email: consumidor.email,
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'consumidor')
  async update(@Param('id') id: number, @Body() dto: CreateConsumidorDto): Promise<ConsumidorResponseDto> {
    const consumidor = await this.consumidorService.update(id, dto);
    return {
      id: consumidor.id,
      nome: consumidor.nome,
      telefone: consumidor.telefone,
      email: consumidor.email,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'consumidor')
  async remove(@Param('id') id: number): Promise<void> {
    await this.consumidorService.remove(id);
  }
}