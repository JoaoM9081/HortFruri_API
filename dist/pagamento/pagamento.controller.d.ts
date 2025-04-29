import { PagamentoService } from './pagamento.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { PagamentoResponseDto } from './dto/pagamentoResponseDto';
export declare class PagamentoController {
    private readonly pagamentoService;
    constructor(pagamentoService: PagamentoService);
    create(pedidoId: number, createPagamentoDto: CreatePagamentoDto): Promise<PagamentoResponseDto>;
    findAll(): Promise<PagamentoResponseDto[]>;
    findOne(id: number): Promise<PagamentoResponseDto>;
    update(id: number, updatePagamentoDto: Partial<CreatePagamentoDto>): Promise<PagamentoResponseDto>;
    remove(id: number): Promise<void>;
}
