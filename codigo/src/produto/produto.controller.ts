import { Controller, Post, Body, Get, Param, Patch, Delete, Query, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { ProdutoCatalogoDto } from './dto/produtoCatalogoDto';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('produtos')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'loja')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post(':lojaId/:categoriaId')
  async create(
    @Param('lojaId', ParseIntPipe) lojaId: number,
    @Param('categoriaId', ParseIntPipe) categoriaId: number,
    @Body() dto: CreateProdutoDto,
  ): Promise<ProdutoCatalogoDto> {
    const produto = await this.produtoService.create(lojaId, categoriaId, dto);
    // agora produto.estoques sempre existe
    const quantidadeDisponivel = produto.estoques
      .reduce((total, e) => total + e.quantidadeDisponivel, 0);

    return {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      categoria: produto.categoria.nome,
      quantidadeDisponivel,
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

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProdutoDto: CreateProdutoDto,
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
}