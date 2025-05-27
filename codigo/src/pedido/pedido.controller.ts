import { Controller, Post, Body, Get, Param, Patch, Delete, Put, ParseIntPipe, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { PedidoResponseDto } from './dto/pedidoResponseDto';
import { Pedido } from './entities/pedido.entity';
import { CreateItemPedidoDto } from '../itemPedido/dto/createItemPedidoDto';
import { FormaPagamentoDto } from 'src/pagamento/dto/formaPagamentoDto';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post('consumidor/:consumidorId/loja/:lojaId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('consumidor')
  async create(
    @Param('consumidorId', ParseIntPipe) consumidorId: number,
    @Param('lojaId', ParseIntPipe) lojaId: number,
    @Body() dto: CreatePedidoDto,
  ): Promise<PedidoResponseDto> {
    const pedido = await this.pedidoService.create(consumidorId, lojaId, dto);
    return this.mapToDto(pedido);
  }

  @Post(':pedidoId/itens/:produtoId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('consumidor')
  async adicionarItem(
    @Param('pedidoId', ParseIntPipe) pedidoId: number,
    @Param('produtoId', ParseIntPipe) produtoId: number,
    @Body() dto: CreateItemPedidoDto,
  ): Promise<PedidoResponseDto> {
    const pedido = await this.pedidoService.adicionarItemCarrinho(pedidoId, produtoId, dto);
    return this.mapToDto(pedido);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findAll(): Promise<PedidoResponseDto[]> {
    const pedidos = await this.pedidoService.findAll();
    return pedidos.map(p => this.mapToDto(p));
  }

  @Get('consumidor/:consumidorId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('consumidor')
  async findByConsumidor(
    @Param('consumidorId', ParseIntPipe) consumidorId: number,
  ): Promise<PedidoResponseDto[]> {
    const pedidos = await this.pedidoService.findByConsumidor(consumidorId);
    return pedidos.map(p => this.mapToDto(p));
  }

  @Patch(':pedidoId/entregador/:entregadorId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('loja', 'admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async atribuirEntregador(
    @Param('pedidoId', ParseIntPipe)           pedidoId: number,
    @Param('entregadorId', ParseIntPipe) entregadorId: number,
  ): Promise<void> {
    await this.pedidoService.atribuirEntregador(
      pedidoId,
      entregadorId
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('consumidor')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreatePedidoDto,
  ): Promise<PedidoResponseDto> {
    const pedido = await this.pedidoService.update(id, dto);
    return this.mapToDto(pedido);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('consumidor')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.pedidoService.remove(id);
  }

  @Delete(':pedidoId/itens/:itemId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('consumidor')
  async removerItem(
    @Param('pedidoId', ParseIntPipe) pedidoId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ): Promise<PedidoResponseDto> {
    const pedido = await this.pedidoService.removerItemCarrinho(pedidoId, itemId);
    return this.mapToDto(pedido);
  }

  private mapToDto(p: Pedido): PedidoResponseDto {
    return {
      id: p.id,
      status: p.status,
      total: p.total,
      dataCriacao: p.dataCriacao,
      endereco: {
      id:         p.endereco.id,
      rua:        p.endereco.rua,
      numero:     p.endereco.numero,
      complemento:p.endereco.complemento,
      cidade:     p.endereco.cidade,
      cep:        p.endereco.cep,
    },

      itens: p.itens.map(item => ({
        id: item.id,
        nomeProduto: item.produto.nome,
        quantidade: item.quantidade,
        precoUnitario: item.precoUnitario,
      })),

      entregadorId: p.entregador?.id,
    };
  }
}