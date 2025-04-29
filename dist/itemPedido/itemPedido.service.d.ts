import { Repository } from 'typeorm';
import { ItemPedido } from './entities/itemPedido.entity';
import { CreateItemPedidoDto } from './dto/create-itemPedido.dto';
export declare class ItemPedidoService {
    private readonly repo;
    constructor(repo: Repository<ItemPedido>);
    create(pedidoId: number, produtoId: number, dto: CreateItemPedidoDto): Promise<ItemPedido>;
    findAll(): Promise<ItemPedido[]>;
    findOne(id: number): Promise<ItemPedido>;
    update(id: number, dto: Partial<CreateItemPedidoDto>): Promise<ItemPedido>;
    remove(id: number): Promise<void>;
}
