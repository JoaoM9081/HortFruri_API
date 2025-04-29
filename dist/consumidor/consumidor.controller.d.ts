import { ConsumidorService } from './consumidor.service';
import { CreateConsumidorDto } from './dto/create-consumidor.dto';
import { ConsumidorResponseDto } from './dto/consumidorResponseDto';
export declare class ConsumidorController {
    private readonly consumidorService;
    constructor(consumidorService: ConsumidorService);
    create(usuarioId: number, dto: CreateConsumidorDto): Promise<ConsumidorResponseDto>;
    findAll(): Promise<ConsumidorResponseDto[]>;
    findOne(id: number): Promise<ConsumidorResponseDto>;
    update(id: number, dto: Partial<CreateConsumidorDto>): Promise<ConsumidorResponseDto>;
    remove(id: number): Promise<void>;
}
