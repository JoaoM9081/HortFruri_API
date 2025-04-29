import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { FiltroCatalogoDto } from './dto/filtroCatalogoDto';
import { ProdutoCatalogoDto } from './dto/produtoCatalogoDto';
export declare class ProdutoService {
    private readonly repo;
    constructor(repo: Repository<Produto>);
    create(lojaId: number, categoriaId: number, dto: CreateProdutoDto): Promise<Produto>;
    findAll(): Promise<Produto[]>;
    findOne(id: number): Promise<Produto>;
    update(id: number, dto: Partial<CreateProdutoDto>): Promise<Produto>;
    remove(id: number): Promise<void>;
    buscar(filtro: FiltroCatalogoDto): Promise<ProdutoCatalogoDto[]>;
    findByName(nome: string): Promise<Produto>;
}
