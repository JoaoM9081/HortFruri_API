import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { FormaPagamento } from 'src/pagamento/dto/create-pagamento.dto';
import { PedidoResponseDto } from './dto/pedidoResponseDto';
import { StatusPedido } from './dto/StatusPedido';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post(':consumidorId/:lojaId')
  async create(
    @Param('consumidorId') consumidorId: number,
    @Param('lojaId') lojaId: number,
    @Body() createPedidoDto: CreatePedidoDto,
  ): Promise<PedidoResponseDto> {
    const pedido = await this.pedidoService.create(consumidorId, lojaId, createPedidoDto);
    return {
      id: pedido.id,
      status: pedido.status, 
      total: pedido.total,
      dataCriacao: pedido.dataCriacao,
      itens: pedido.itens.map(item => ({
        id: item.id,
        nomeProduto: item.produto.nome,
        quantidade: item.quantidade,
        precoUnitario: item.precoUnitario,
      })),
    };
  }

  @Get()
  async findAll(): Promise<PedidoResponseDto[]> {
    const pedidos = await this.pedidoService.findAll();
    return pedidos.map(pedido => ({
      id: pedido.id,
      status: pedido.status, 
      total: pedido.total,
      dataCriacao: pedido.dataCriacao,
      itens: pedido.itens.map(item => ({
        id: item.id,
        nomeProduto: item.produto.nome,
        quantidade: item.quantidade,
        precoUnitario: item.precoUnitario,
      })),
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PedidoResponseDto> {
    const pedido = await this.pedidoService.findOne(id);
    return {
      id: pedido.id,
      status: pedido.status,
      total: pedido.total,
      dataCriacao: pedido.dataCriacao,
      itens: pedido.itens.map(item => ({
        id: item.id,
        nomeProduto: item.produto.nome,
        quantidade: item.quantidade,
        precoUnitario: item.precoUnitario,
      })),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePedidoDto: Partial<CreatePedidoDto>,
  ): Promise<PedidoResponseDto> {
    const pedido = await this.pedidoService.update(id, updatePedidoDto);
    return {
      id: pedido.id,
      status: pedido.status, 
      total: pedido.total,
      dataCriacao: pedido.dataCriacao,
      itens: pedido.itens.map(item => ({
        id: item.id,
        nomeProduto: item.produto.nome,
        quantidade: item.quantidade,
        precoUnitario: item.precoUnitario,
      })),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.pedidoService.remove(id);
  }

  @Post(':pedidoId/checkout/:forma')
  async iniciarCheckout(
    @Param('pedidoId') pedidoId: number,
    @Param('forma') forma: FormaPagamento,
  ) {
    const pagamento = await this.pedidoService.iniciarCheckout(pedidoId, forma);
    return pagamento;
  }

  @Post(':pedidoId/confirmar-pagamento/:pagamentoId')
  async confirmarPagamento(
    @Param('pedidoId') pedidoId: number,
    @Param('pagamentoId') pagamentoId: number,
  ) {
    const pagamentoConfirmado = await this.pedidoService.confirmarPagamento(pagamentoId);
    return pagamentoConfirmado;
  }
}