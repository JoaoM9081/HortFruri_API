import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { EnderecoResponseDto } from './dto/EnderecoResponseDto';
import { JwtAuthGuard } from 'src/auth/guards/JwtAuthGuard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'consumidor', 'loja')
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

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'consumidor', 'loja')
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'consumidor', 'loja')
  async remove(@Param('id') id: number): Promise<void> {
    await this.enderecoService.remove(id);
  }
}