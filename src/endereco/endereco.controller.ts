import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { EnderecoResponseDto } from './dto/EnderecoResponseDto';

@Controller('enderecos')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post()
  async create(@Body() createEnderecoDto: CreateEnderecoDto): Promise<EnderecoResponseDto> {
    const endereco = await this.enderecoService.create(createEnderecoDto);
    return {
      id: endereco.id,
      rua: endereco.rua,
      numero: endereco.numero,
      cidade: endereco.cidade,
      cep: endereco.cep,
    };
  }

  @Get()
  async findAll(): Promise<EnderecoResponseDto[]> {
    const enderecos = await this.enderecoService.findAll();
    return enderecos.map((endereco) => ({
      id: endereco.id,
      rua: endereco.rua,
      numero: endereco.numero,
      cidade: endereco.cidade,
      cep: endereco.cep,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<EnderecoResponseDto> {
    const endereco = await this.enderecoService.findOne(id);
    return {
      id: endereco.id,
      rua: endereco.rua,
      numero: endereco.numero,
      cidade: endereco.cidade,
      cep: endereco.cep,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEnderecoDto: UpdateEnderecoDto,
  ): Promise<EnderecoResponseDto> {
    const endereco = await this.enderecoService.update(id, updateEnderecoDto);
    return {
      id: endereco.id,
      rua: endereco.rua,
      numero: endereco.numero,
      cidade: endereco.cidade,
      cep: endereco.cep,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.enderecoService.remove(id);
  }
}