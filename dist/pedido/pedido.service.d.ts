import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { ItemPedido } from 'src/itemPedido/entities/itemPedido.entity';
import { ProdutoService } from 'src/produto/produto.service';
import { EstoqueService } from 'src/estoque/estoque.service';
import { PagamentoService } from 'src/pagamento/pagamento.service';
import { CreateItemPedidoDto } from 'src/itemPedido/dto/create-itemPedido.dto';
import { FormaPagamento } from 'src/pagamento/dto/create-pagamento.dto';
import { CreatePedidoDto } from './dto/create-pedido.dto';
export declare class PedidoService {
    private readonly pedidoRepo;
    private readonly itemRepo;
    private readonly produtoService;
    private readonly estoqueService;
    private readonly pagamentoService;
    constructor(pedidoRepo: Repository<Pedido>, itemRepo: Repository<ItemPedido>, produtoService: ProdutoService, estoqueService: EstoqueService, pagamentoService: PagamentoService);
    create(consumidorId: number, lojaId: number, dto: CreatePedidoDto): Promise<Pedido>;
    findAll(): Promise<Pedido[]>;
    findOne(id: number): Promise<Pedido>;
    update(id: number, dto: Partial<CreatePedidoDto>): Promise<Pedido>;
    remove(id: number): Promise<void>;
    pegarOuCriarCarrinho(consumidorId: number, lojaId: number): Promise<Pedido>;
    adicionarItemCarrinho(consumidorId: number, lojaId: number, produtoId: number, dto: CreateItemPedidoDto): Promise<Pedido>;
    removerItemCarrinho(pedidoId: number, itemId: number): Promise<Pedido>;
    private recalcularTotal;
    iniciarCheckout(pedidoId: number, forma: FormaPagamento): Promise<import("../pagamento/entities/pagamento.entity").Pagamento>;
    confirmarPagamento(pagamentoId: number): Promise<Pedido>;
}
