import { Controller, Post, Body, Get, Param, Patch, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { ConsumidorService } from './consumidor.service';
import { CreateConsumidorDto } from './dto/create-consumidor.dto';
import { ConsumidorResponseDto } from './dto/consumidorResponseDto';

@Controller('consumidores')  // A URL agora inclui o :usuarioId
export class ConsumidorController {
  constructor(private readonly consumidorService: ConsumidorService) {}

  @Post('usuario/:usuarioId')
  async create(
    @Param('usuarioId', ParseIntPipe) usuarioId: number,  
    @Body() dto: CreateConsumidorDto, 
  ): Promise<ConsumidorResponseDto> {
    const c = await this.consumidorService.create(usuarioId, dto);
    
    return { id: c.id, nome: c.nome, telefone: c.telefone };
  }

  // Listagem de todos os consumidores
  @Get()
  async findAll(): Promise<ConsumidorResponseDto[]> {
    const consumidores = await this.consumidorService.findAll();  // Busca todos os consumidores
    return consumidores.map((consumidor) => ({  // Retorna os dados formatados
      id: consumidor.id,
      nome: consumidor.nome,
      telefone: consumidor.telefone,
    }));
  }

  // Buscar um consumidor específico pelo id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ConsumidorResponseDto> {
    const consumidor = await this.consumidorService.findOne(id);  // Chama o serviço para buscar pelo id
    return {
      id: consumidor.id,
      nome: consumidor.nome,
      telefone: consumidor.telefone,
    };
  }

  // Atualização de dados de um consumidor
  @Put(':id')
  async update(
    @Param('id') id: number,  // Recebe o ID do consumidor a ser atualizado
    @Body() dto: CreateConsumidorDto,  // Dados completos para a atualização
  ): Promise<ConsumidorResponseDto> {
    // Chama o serviço para atualizar o consumidor
    const consumidor = await this.consumidorService.update(id, dto);
    return {
      id: consumidor.id,
      nome: consumidor.nome,
      telefone: consumidor.telefone,
    };
  }

  // Remover um consumidor pelo id
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.consumidorService.remove(id);  // Chama o serviço para remover
  }
}