import { Controller, Post, Body, Get, Param, Patch, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { FormaPagamento } from 'src/pagamento/dto/create-pagamento.dto';
import { PedidoResponseDto } from './dto/pedidoResponseDto';
import { Pedido } from './entities/pedido.entity';
import { CreateItemPedidoDto } from '../itemPedido/dto/createItemPedidoDto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post(':consumidorId/:lojaId')
  async create(
    @Param('consumidorId', ParseIntPipe) consumidorId: number,
    @Param('lojaId', ParseIntPipe) lojaId: number,
    @Body() dto: CreatePedidoDto,
  ): Promise<PedidoResponseDto> {
    const pedido = await this.pedidoService.create(consumidorId, lojaId, dto);
    return this.mapToDto(pedido);
  }

  @Get()
  async findAll(): Promise<PedidoResponseDto[]> {
    const pedidos = await this.pedidoService.findAll();
    return pedidos.map(p => this.mapToDto(p));
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PedidoResponseDto> {
    const pedido = await this.pedidoService.findOne(id);
    return this.mapToDto(pedido);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreatePedidoDto,
  ): Promise<PedidoResponseDto> {
    const pedido = await this.pedidoService.update(id, dto);
    return this.mapToDto(pedido);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.pedidoService.remove(id);
  }

  @Post(':pedidoId/itens/:produtoId')
  async adicionarItem(
    @Param('pedidoId', ParseIntPipe) pedidoId: number,
    @Param('produtoId', ParseIntPipe) produtoId: number,
    @Body() dto: CreateItemPedidoDto,
  ): Promise<PedidoResponseDto> {
    const pedido = await this.pedidoService.adicionarItemCarrinho(pedidoId, produtoId, dto);
    return this.mapToDto(pedido);
  }

  @Delete(':pedidoId/itens/:itemId')
  async removerItem(
    @Param('pedidoId', ParseIntPipe) pedidoId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ): Promise<PedidoResponseDto> {
    const pedido = await this.pedidoService.removerItemCarrinho(pedidoId, itemId);
    return this.mapToDto(pedido);
  }

  @Post(':pedidoId/finalizar/:forma')
  async finalizar(
    @Param('pedidoId', ParseIntPipe) pedidoId: number,
    @Param('forma') forma: FormaPagamento,
  ): Promise<PedidoResponseDto> {
    const pedido = await this.pedidoService.finalizarPedido(pedidoId, forma);
    return this.mapToDto(pedido);
  }

  private mapToDto(p: Pedido): PedidoResponseDto {
    return {
      id: p.id,
      status: p.status,
      total: p.total,
      dataCriacao: p.dataCriacao,
      itens: p.itens.map(item => ({
        id: item.id,
        nomeProduto: item.produto.nome,
        quantidade: item.quantidade,
        precoUnitario: item.precoUnitario,
      })),
    };
  }
}