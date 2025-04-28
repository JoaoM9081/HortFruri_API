import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { ProdutoService } from '../produto/produto.service';
import { LojaService } from '../loja/loja.service';
import { EstoqueResponseDto } from './dto/EstoqueResponseDto';

@Controller('estoques')
export class EstoqueController {
  constructor(
    private readonly estoqueService: EstoqueService,
    private readonly produtoService: ProdutoService,
    private readonly lojaService: LojaService,
  ) {}

  @Post()
  async create(
    @Param('produtoNome') produtoNome: string,
    @Param('lojaNome') lojaNome: string,
    @Body() createEstoqueDto: CreateEstoqueDto,
  ): Promise<EstoqueResponseDto> {
    const produto = await this.produtoService.findByName(produtoNome);
    const loja = await this.lojaService.findByName(lojaNome);

    const estoque = await this.estoqueService.create(produto.id, loja.id, createEstoqueDto);
    return {
      id: estoque.id,
      quantidadeDisponivel: estoque.quantidadeDisponivel,
      produtoNome: produto.nome,
      lojaNome: loja.nome,
    };
  }

  @Get()
  async findAll(): Promise<EstoqueResponseDto[]> {
    const estoques = await this.estoqueService.findAll();
    return estoques.map((estoque) => ({
      id: estoque.id,
      quantidadeDisponivel: estoque.quantidadeDisponivel,
      produtoNome: estoque.produto.nome,
      lojaNome: estoque.loja.nome,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<EstoqueResponseDto> {
    const estoque = await this.estoqueService.findOne(id);
    return {
      id: estoque.id,
      quantidadeDisponivel: estoque.quantidadeDisponivel,
      produtoNome: estoque.produto.nome,
      lojaNome: estoque.loja.nome,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEstoqueDto: CreateEstoqueDto,
  ): Promise<EstoqueResponseDto> {
    const estoque = await this.estoqueService.update(id, updateEstoqueDto);
    return {
      id: estoque.id,
      quantidadeDisponivel: estoque.quantidadeDisponivel,
      produtoNome: estoque.produto.nome,
      lojaNome: estoque.loja.nome,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.estoqueService.remove(id);
  }

  @Post(':lojaNome/:produtoNome/decrement')
  async decrementStock(
    @Param('lojaNome') lojaNome: string,
    @Param('produtoNome') produtoNome: string,
    @Body() dto: { quantidade: number },
  ): Promise<void> {
    const produto = await this.produtoService.findByName(produtoNome);
    const loja = await this.lojaService.findByName(lojaNome);
    await this.estoqueService.decrementStock(loja.id, produto.id, dto.quantidade);
  }
}