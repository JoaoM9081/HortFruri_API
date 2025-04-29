import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { EnderecoResponseDto } from './dto/EnderecoResponseDto';
export declare class EnderecoController {
    private readonly enderecoService;
    constructor(enderecoService: EnderecoService);
    create(createEnderecoDto: CreateEnderecoDto): Promise<EnderecoResponseDto>;
    findAll(): Promise<EnderecoResponseDto[]>;
    findOne(id: number): Promise<EnderecoResponseDto>;
    update(id: number, updateEnderecoDto: UpdateEnderecoDto): Promise<EnderecoResponseDto>;
    remove(id: number): Promise<void>;
}
