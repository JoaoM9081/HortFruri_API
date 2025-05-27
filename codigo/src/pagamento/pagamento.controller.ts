// src/pagamento/pagamento.controller.ts
import {Controller, Post, Param, Body, ParseIntPipe, UseGuards,} from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { FormaPagamentoDto } from './dto/formaPagamentoDto';
import { PedidoResponseDto } from 'src/pedido/dto/pedidoResponseDto';
import { PagamentoResponseDto } from './dto/PagamentoResponseDto';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
  
  @Controller('pagamentos')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('consumidor')
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
        endereco: {
        id:         pedido.endereco.id,
        rua:        pedido.endereco.rua,
        numero:     pedido.endereco.numero,
        complemento:pedido.endereco.complemento,
        cidade:     pedido.endereco.cidade,
        cep:        pedido.endereco.cep,
      },
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