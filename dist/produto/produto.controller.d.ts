import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { ProdutoCatalogoDto } from './dto/produtoCatalogoDto';
import { FiltroCatalogoDto } from './dto/filtroCatalogoDto';
export declare class ProdutoController {
    private readonly produtoService;
    constructor(produtoService: ProdutoService);
    create(lojaId: number, categoriaId: number, createProdutoDto: CreateProdutoDto): Promise<ProdutoCatalogoDto>;
    findAll(): Promise<ProdutoCatalogoDto[]>;
    findOne(id: number): Promise<ProdutoCatalogoDto>;
    update(id: number, updateProdutoDto: Partial<CreateProdutoDto>): Promise<ProdutoCatalogoDto>;
    remove(id: number): Promise<void>;
    buscar(filtro: FiltroCatalogoDto): Promise<ProdutoCatalogoDto[]>;
}
