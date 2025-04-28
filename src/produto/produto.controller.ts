import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { ProdutoCatalogoDto } from './dto/produtoCatalogoDto';
import { FiltroCatalogoDto } from './dto/filtroCatalogoDto';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post(':lojaId/:categoriaId')
  async create(
    @Param('lojaId') lojaId: number,
    @Param('categoriaId') categoriaId: number,
    @Body() createProdutoDto: CreateProdutoDto,
  ): Promise<ProdutoCatalogoDto> {
    const produto = await this.produtoService.create(lojaId, categoriaId, createProdutoDto);
    return {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      categoria: produto.categoria.nome,
      quantidadeDisponivel: produto.estoques.reduce((total, estoque) => total + estoque.quantidadeDisponivel, 0),
    };
  }

  @Get()
  async findAll(): Promise<ProdutoCatalogoDto[]> {
    const produtos = await this.produtoService.findAll();
    return produtos.map(produto => ({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      categoria: produto.categoria.nome,
      quantidadeDisponivel: produto.estoques.reduce((total, estoque) => total + estoque.quantidadeDisponivel, 0),
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProdutoCatalogoDto> {
    const produto = await this.produtoService.findOne(id);
    return {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      categoria: produto.categoria.nome,
      quantidadeDisponivel: produto.estoques.reduce((total, estoque) => total + estoque.quantidadeDisponivel, 0),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProdutoDto: Partial<CreateProdutoDto>,
  ): Promise<ProdutoCatalogoDto> {
    const produto = await this.produtoService.update(id, updateProdutoDto);
    return {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      categoria: produto.categoria.nome,
      quantidadeDisponivel: produto.estoques.reduce((total, estoque) => total + estoque.quantidadeDisponivel, 0),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.produtoService.remove(id);
  }

  @Get('/buscar')
  async buscar(@Query() filtro: FiltroCatalogoDto): Promise<ProdutoCatalogoDto[]> {
    const produtos = await this.produtoService.buscar(filtro);
    return produtos;
  }
}