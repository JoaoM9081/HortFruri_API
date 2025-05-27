import { Controller, Post, Body, Get, Param, Patch, Delete, Put, ParseArrayPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { EstoqueService } from './estoque.service';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { ProdutoService } from '../produto/produto.service';
import { LojaService } from '../loja/loja.service';
import { EstoqueResponseDto } from './dto/EstoqueResponseDto';
import { ProdutoNomeDto } from './dto/ProdutoNomeDto';
import { EstoqueDecrementarDto } from './dto/EstoqueDecrementarDto';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('estoques')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'loja')
export class EstoqueController {
  constructor(
    private readonly estoqueService: EstoqueService,
    private readonly produtoService: ProdutoService,
    private readonly lojaService: LojaService,
  ) {}

  @Post(':produtoId/:lojaId/adicionar')	
  async create(
    @Param('produtoId', ParseIntPipe) produtoId: number,
    @Param('lojaId', ParseIntPipe) lojaId: number,
    @Body() createEstoqueDto: CreateEstoqueDto,
  ): Promise<EstoqueResponseDto> {

    const estoque = await this.estoqueService.create(produtoId, lojaId, createEstoqueDto);
    const produto = await this.produtoService.findOne(produtoId);  
    const loja = await this.lojaService.findOne(lojaId); 
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

  @Put(':id')
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

  @Post(':lojaId/:produtoId/decrementar')
  async decrementStock(
    @Param('lojaId', ParseIntPipe) lojaId: number,
    @Param('produtoId', ParseIntPipe) produtoId: number,
    @Body() dto: EstoqueDecrementarDto,
  ): Promise<void> {
    await this.estoqueService.decrementStock(lojaId, produtoId, dto.quantidade);
  }
}