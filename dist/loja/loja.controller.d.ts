import { LojaService } from './loja.service';
import { CreateLojaDto } from './dto/create-loja.dto';
import { LojaResponseDto } from './dto/LojaResponseDto';
export declare class LojaController {
    private readonly lojaService;
    constructor(lojaService: LojaService);
    create(usuarioId: number, enderecoId: number, createLojaDto: CreateLojaDto): Promise<LojaResponseDto>;
    findAll(): Promise<LojaResponseDto[]>;
    findOne(id: number): Promise<LojaResponseDto>;
    update(id: number, updateLojaDto: Partial<CreateLojaDto>): Promise<LojaResponseDto>;
    remove(id: number): Promise<void>;
    findByName(nome: string): Promise<LojaResponseDto>;
}
