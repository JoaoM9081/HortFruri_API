import { ItemPedidoService } from './itemPedido.service';
import { CreateItemPedidoDto } from './dto/create-itemPedido.dto';
import { ProdutoService } from '../produto/produto.service';
import { ItemPedidoResponseDto } from './dto/itemPedidoResponseDto';
export declare class ItemPedidoController {
    private readonly itemPedidoService;
    private readonly produtoService;
    constructor(itemPedidoService: ItemPedidoService, produtoService: ProdutoService);
    create(pedidoId: number, produtoId: number, createItemPedidoDto: CreateItemPedidoDto): Promise<ItemPedidoResponseDto>;
    findAll(): Promise<ItemPedidoResponseDto[]>;
    findOne(id: number): Promise<ItemPedidoResponseDto>;
    update(id: number, updateItemPedidoDto: CreateItemPedidoDto): Promise<ItemPedidoResponseDto>;
    remove(id: number): Promise<void>;
}
