// src/pagamento/pagamento.controller.ts
import {Controller, Post, Param, Body, ParseIntPipe,} from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { FormaPagamentoDto } from './dto/formaPagamentoDto';
import { PedidoResponseDto } from 'src/pedido/dto/pedidoResponseDto';
import { PagamentoResponseDto } from './dto/PagamentoResponseDto';
  
  @Controller('pagamentos')
  export class PagamentoController {
    constructor(private readonly pagamentoService: PagamentoService) {}
  
    @Post(':pedidoId/pagar')
    async pagar(
      @Param('pedidoId', ParseIntPipe) pedidoId: number,
      @Body() dto: FormaPagamentoDto,
    ): Promise<PagamentoResponseDto> {
  
      const { pagamento, pedido } = await this.pagamentoService.pagar(
        pedidoId,
        dto.formaPagamento,
      );
  
      const pedidoDto: PedidoResponseDto = {
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
  
      const response: PagamentoResponseDto = {
        pagamentoId:     pagamento.id,
        formaPagamento:  pagamento.formaPagamento,
        statusPagamento: pagamento.status,
        pedido:          pedidoDto,        
      };
  
      return response;
    }
  }