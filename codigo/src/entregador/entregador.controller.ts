import { Controller, Post, Body, Get, Param, Patch, Delete, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { EntregadorService } from './entregador.service';
import { CreateEntregadorDto } from './dto/create-entregador.dto';
import { EntregadorResponseDto } from './dto/entregadorResponseDto';
import { PedidoService } from 'src/pedido/pedido.service';
import { EntregadorPedidoDto } from 'src/pedido/dto/EntregadorPedidoDto';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('entregadores')
export class EntregadorController {
  constructor(private readonly entregadorService: EntregadorService,
     private readonly pedidoService: PedidoService,
  ) {}

  @Post()
  async create(@Body() createEntregadorDto: CreateEntregadorDto): Promise<EntregadorResponseDto> {
    const entregador = await this.entregadorService.create(createEntregadorDto);
    return {
      id: entregador.id,
      nome: entregador.nome,
      telefone: entregador.telefone,
      veiculo: entregador.veiculo,
      placa: entregador.placa,
      email: entregador.email,
    };
  }

  @Get()
  @Put(':id')@UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findAll(): Promise<EntregadorResponseDto[]> {
    const entregadores = await this.entregadorService.findAll();
    return entregadores.map((entregador) => ({
      id: entregador.id,
      nome: entregador.nome,
      telefone: entregador.telefone,
      veiculo: entregador.veiculo,
      placa: entregador.placa,
      email: entregador.email,
    }));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'entregador')
  async findOne(@Param('id') id: number): Promise<EntregadorResponseDto> {
    const entregador = await this.entregadorService.findOne(id);
    return {
      id: entregador.id,
      nome: entregador.nome,
      telefone: entregador.telefone,
      veiculo: entregador.veiculo,
      placa: entregador.placa,
      email: entregador.email,
    };
  }

  @Get(':id/pedidos')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('entregador')
  async pedidosDoEntregador(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EntregadorPedidoDto[]> {
    const pedidos: Pedido[] = await this.pedidoService.findByEntregador(id);
    return pedidos.map(p => ({
      pedidoId: p.id,
      enderecoRecepcao: {
        id:         p.loja.endereco.id,
        rua:        p.loja.endereco.rua,
        numero:     p.loja.endereco.numero,
        complemento:p.loja.endereco.complemento,
        cidade:     p.loja.endereco.cidade,
        cep:        p.loja.endereco.cep,
      },
      enderecoEntrega: {
        id:         p.endereco.id,
        rua:        p.endereco.rua,
        numero:     p.endereco.numero,
        complemento:p.endereco.complemento,
        cidade:     p.endereco.cidade,
        cep:        p.endereco.cep,
      },
    }));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'entregador')
  async update(
    @Param('id') id: number,
    @Body() updateEntregadorDto: CreateEntregadorDto,
  ): Promise<EntregadorResponseDto> {
    const entregador = await this.entregadorService.update(id, updateEntregadorDto);
    return {
      id: entregador.id,
      nome: entregador.nome,
      telefone: entregador.telefone,
      veiculo: entregador.veiculo,
      placa: entregador.placa,
      email: entregador.email,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'entregador')
  async remove(@Param('id') id: number): Promise<void> {
    await this.entregadorService.remove(id);
  }
}