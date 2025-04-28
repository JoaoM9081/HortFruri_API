import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { FiltroCatalogoDto, OrdenacaoCatalogo } from './dto/filtroCatalogoDto';
import { ProdutoCatalogoDto } from './dto/produtoCatalogoDto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly repo: Repository<Produto>,
  ) {}

  async create(
    lojaId: number,
    categoriaId: number,
    dto: CreateProdutoDto,
  ): Promise<Produto> {
    const produto = this.repo.create({
      ...dto,
      loja: { id: lojaId },
      categoria: { id: categoriaId },
    });
    return this.repo.save(produto);
  }

  findAll(): Promise<Produto[]> {
    return this.repo.find({ relations: ['loja', 'categoria', 'estoques'] });
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.repo.findOne({
      where: { id }, 
      relations: ['loja', 'categoria', 'estoques'], 
    });
    
    if (!produto) throw new NotFoundException(`Produto ${id} não encontrado`);
    return produto;
  }

  async update(
    id: number,
    dto: Partial<CreateProdutoDto>,
  ): Promise<Produto> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async buscar(filtro: FiltroCatalogoDto): Promise<ProdutoCatalogoDto[]> {
    const qb = this.repo.createQueryBuilder('produto')
      .innerJoin('produto.categoria', 'categoria')
      .leftJoin('produto.estoques', 'estoque')
      .select([
        'produto.id',
        'produto.nome',
        'produto.preco',
        'categoria.nome',
      ])
      .addSelect('COALESCE(SUM(estoque.quantidadeDisponivel), 0)', 'quantidadeDisponivel');

    // Filtros
    if (filtro.nome) {
      qb.andWhere('LOWER(produto.nome) LIKE LOWER(:nome)', { nome: `%${filtro.nome}%` });
    }
    if (filtro.categoriaId) {
      qb.andWhere('categoria.id = :catId', { catId: filtro.categoriaId });
    }
    if (filtro.minPreco !== undefined) {
      qb.andWhere('produto.preco >= :min', { min: filtro.minPreco });
    }
    if (filtro.maxPreco !== undefined) {
      qb.andWhere('produto.preco <= :max', { max: filtro.maxPreco });
    }
    if (filtro.disponivel !== undefined) {
      qb.andWhere('COALESCE(SUM(estoque.quantidadeDisponivel), 0) > 0');
    }

    // Agrupamento para soma de estoque e vendas
    qb.groupBy('produto.id').addGroupBy('categoria.nome');

    // Ordenação
    switch (filtro.ordenacao) {
      case OrdenacaoCatalogo.PRECO_ASC:
        qb.orderBy('produto.preco', 'ASC');
        break;
      case OrdenacaoCatalogo.PRECO_DESC:
        qb.orderBy('produto.preco', 'DESC');
        break;
      case OrdenacaoCatalogo.MAIS_VENDIDOS:
        qb.leftJoin('produto.itensPedido', 'ip')
          .addSelect('COUNT(ip.id)', 'totalVendido')
          .orderBy('COUNT(ip.id)', 'DESC');
        break;
      default:
        qb.orderBy('produto.nome', 'ASC');
    }

    const resultados = await qb.getRawAndEntities();
    return resultados.entities.map((produto, idx) => {
      const raw = resultados.raw[idx];
      return {
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        categoria: raw['categoria_nome'],
        quantidadeDisponivel: +raw['quantidadeDisponivel'],
        totalVendido: raw['totalVendido'] ? +raw['totalVendido'] : undefined,
      };
    });
  }

  async findByName(nome: string): Promise<Produto> {
    const produto = await this.repo.findOne({ where: { nome } });
    if (!produto) throw new NotFoundException(`Produto com nome ${nome} não encontrado`);
    return produto;
  }
}