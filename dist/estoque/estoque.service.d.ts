import { Repository } from 'typeorm';
import { Estoque } from './entities/estoque.entity';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { ProdutoService } from '../produto/produto.service';
import { LojaService } from '../loja/loja.service';
export declare class EstoqueService {
    private readonly repo;
    private readonly produtoService;
    private readonly lojaService;
    constructor(repo: Repository<Estoque>, produtoService: ProdutoService, lojaService: LojaService);
    create(produtoId: number, lojaId: number, dto: CreateEstoqueDto): Promise<Estoque>;
    findAll(): Promise<Estoque[]>;
    findOne(id: number): Promise<Estoque>;
    update(id: number, dto: Partial<CreateEstoqueDto>): Promise<Estoque>;
    remove(id: number): Promise<void>;
    decrementStock(lojaId: number, produtoId: number, quantidade: number): Promise<void>;
}
