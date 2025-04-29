import { Controller, Post, Body, Get, Param, Patch, Delete, Put } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { PagamentoResponseDto } from './dto/pagamentoResponseDto';

@Controller('pagamentos')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @Post(':pedidoId')
  async create(
    @Param('pedidoId') pedidoId: number,
    @Body() createPagamentoDto: CreatePagamentoDto,
  ): Promise<PagamentoResponseDto> {
    const pagamento = await this.pagamentoService.create(pedidoId, createPagamentoDto);
    return {
      id: pagamento.id,
      formaPagamento: pagamento.formaPagamento,
      status: pagamento.status,
      valorPago: pagamento.valorPago,
    };
  }

  @Get()
  async findAll(): Promise<PagamentoResponseDto[]> {
    const pagamentos = await this.pagamentoService.findAll();
    return pagamentos.map((pagamento) => ({
      id: pagamento.id,
      formaPagamento: pagamento.formaPagamento,
      status: pagamento.status,
      valorPago: pagamento.valorPago,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PagamentoResponseDto> {
    const pagamento = await this.pagamentoService.findOne(id);
    return {
      id: pagamento.id,
      formaPagamento: pagamento.formaPagamento,
      status: pagamento.status,
      valorPago: pagamento.valorPago,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePagamentoDto: CreatePagamentoDto,
  ): Promise<PagamentoResponseDto> {
    const pagamento = await this.pagamentoService.update(id, updatePagamentoDto);
    return {
      id: pagamento.id,
      formaPagamento: pagamento.formaPagamento,
      status: pagamento.status,
      valorPago: pagamento.valorPago,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.pagamentoService.remove(id);
  }
}
