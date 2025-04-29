import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { FormaPagamento } from 'src/pagamento/dto/create-pagamento.dto';
import { PedidoResponseDto } from './dto/pedidoResponseDto';
export declare class PedidoController {
    private readonly pedidoService;
    constructor(pedidoService: PedidoService);
    create(consumidorId: number, lojaId: number, createPedidoDto: CreatePedidoDto): Promise<PedidoResponseDto>;
    findAll(): Promise<PedidoResponseDto[]>;
    findOne(id: number): Promise<PedidoResponseDto>;
    update(id: number, updatePedidoDto: Partial<CreatePedidoDto>): Promise<PedidoResponseDto>;
    remove(id: number): Promise<void>;
    iniciarCheckout(pedidoId: number, forma: FormaPagamento): Promise<import("../pagamento/entities/pagamento.entity").Pagamento>;
    confirmarPagamento(pedidoId: number, pagamentoId: number): Promise<import("./entities/pedido.entity").Pedido>;
}
