import { Repository } from 'typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
export declare class PagamentoService {
    private readonly repo;
    constructor(repo: Repository<Pagamento>);
    create(pedidoId: number, dto: CreatePagamentoDto): Promise<Pagamento>;
    findAll(): Promise<Pagamento[]>;
    findOne(id: number): Promise<Pagamento>;
    update(id: number, dto: Partial<CreatePagamentoDto>): Promise<Pagamento>;
    remove(id: number): Promise<void>;
}
