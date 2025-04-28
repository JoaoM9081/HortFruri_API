import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ItemPedidoService } from './itemPedido.service';
import { CreateItemPedidoDto } from './dto/create-itemPedido.dto';
import { ProdutoService } from '../produto/produto.service';
import { ItemPedidoResponseDto } from './dto/itemPedidoResponseDto';

@Controller('itens-pedido')
export class ItemPedidoController {
  constructor(
    private readonly itemPedidoService: ItemPedidoService,
    private readonly produtoService: ProdutoService,
  ) {}

  @Post()
  async create(
    @Param('pedidoId') pedidoId: number,
    @Param('produtoId') produtoId: number,
    @Body() createItemPedidoDto: CreateItemPedidoDto,
  ): Promise<ItemPedidoResponseDto> {
    const itemPedido = await this.itemPedidoService.create(pedidoId, produtoId, createItemPedidoDto);
    const produto = await this.produtoService.findOne(produtoId); // Obtendo o produto para retornar o nome e o preço
    return {
      id: itemPedido.id,
      nomeProduto: produto.nome,
      quantidade: itemPedido.quantidade,
      precoUnitario: produto.preco,
    };
  }

  @Get()
  async findAll(): Promise<ItemPedidoResponseDto[]> {
    const itensPedido = await this.itemPedidoService.findAll();
    
    const itensResponse = await Promise.all(
      itensPedido.map(async (item) => {
        const produto = await this.produtoService.findOne(item.produto.id);
        return {
          id: item.id,
          nomeProduto: produto.nome,
          quantidade: item.quantidade,
          precoUnitario: produto.preco,
        };
      })
    );

    return itensResponse;
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ItemPedidoResponseDto> {
    const itemPedido = await this.itemPedidoService.findOne(id);
    const produto = await this.produtoService.findOne(itemPedido.produto.id);
    return {
      id: itemPedido.id,
      nomeProduto: produto.nome,
      quantidade: itemPedido.quantidade,
      precoUnitario: produto.preco,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateItemPedidoDto: CreateItemPedidoDto,
  ): Promise<ItemPedidoResponseDto> {
    const itemPedido = await this.itemPedidoService.update(id, updateItemPedidoDto);
    const produto = await this.produtoService.findOne(itemPedido.produto.id);
    return {
      id: itemPedido.id,
      nomeProduto: produto.nome,
      quantidade: itemPedido.quantidade,
      precoUnitario: produto.preco,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.itemPedidoService.remove(id);
  }
}