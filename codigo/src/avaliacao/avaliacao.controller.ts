// src/avaliacao/avaliacao.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AvaliacaoService }     from './avaliacao.service';
import { CreateAvaliacaoDto }   from './dto/create-avaliacao.dto';
import { AvaliacaoResponseDto } from './dto/AvaliacaoResponseDto';
import { Avaliacao } from './entities/avaliacao.entity';

@Controller('pedidos/:pedidoId/avaliacoes')
export class AvaliacaoController {
  constructor(private readonly service: AvaliacaoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('pedidoId', ParseIntPipe) pedidoId: number,
    @Body() dto: CreateAvaliacaoDto,
  ): Promise<AvaliacaoResponseDto> {
    const aval = await this.service.create(pedidoId, dto);
    return {
      id: aval.id,
      nota: aval.nota,
      comentario: aval.comentario,
      dataCriacao: aval.dataCriacao,
    };
  }

  @Get()
  async findByPedido(
    @Param('pedidoId', ParseIntPipe) pedidoId: number,
  ): Promise<AvaliacaoResponseDto[]> {
    const list: Avaliacao[] = await this.service.findByPedidoId(pedidoId);
    return list.map(a => ({
      id:          a.id,
      nota:        a.nota,
      comentario:  a.comentario,
      dataCriacao: a.dataCriacao,
    }));
  }
}
