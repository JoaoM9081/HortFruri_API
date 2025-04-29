import { EstoqueService } from './estoque.service';
import { CreateEstoqueDto } from './dto/create-estoque.dto';
import { ProdutoService } from '../produto/produto.service';
import { LojaService } from '../loja/loja.service';
import { EstoqueResponseDto } from './dto/EstoqueResponseDto';
export declare class EstoqueController {
    private readonly estoqueService;
    private readonly produtoService;
    private readonly lojaService;
    constructor(estoqueService: EstoqueService, produtoService: ProdutoService, lojaService: LojaService);
    create(produtoNome: string, lojaNome: string, createEstoqueDto: CreateEstoqueDto): Promise<EstoqueResponseDto>;
    findAll(): Promise<EstoqueResponseDto[]>;
    findOne(id: number): Promise<EstoqueResponseDto>;
    update(id: number, updateEstoqueDto: CreateEstoqueDto): Promise<EstoqueResponseDto>;
    remove(id: number): Promise<void>;
    decrementStock(lojaNome: string, produtoNome: string, dto: {
        quantidade: number;
    }): Promise<void>;
}
