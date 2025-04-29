import { EntregadorService } from './entregador.service';
import { CreateEntregadorDto } from './dto/create-entregador.dto';
import { EntregadorResponseDto } from './dto/entregadorResponseDto';
export declare class EntregadorController {
    private readonly entregadorService;
    constructor(entregadorService: EntregadorService);
    create(usuarioId: number, createEntregadorDto: CreateEntregadorDto): Promise<EntregadorResponseDto>;
    findAll(): Promise<EntregadorResponseDto[]>;
    findOne(id: number): Promise<EntregadorResponseDto>;
    update(id: number, updateEntregadorDto: Partial<CreateEntregadorDto>): Promise<EntregadorResponseDto>;
    remove(id: number): Promise<void>;
}
