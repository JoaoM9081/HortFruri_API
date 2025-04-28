import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntregadorService } from './entregador.service';
import { CreateEntregadorDto } from './dto/create-entregador.dto';
import { UpdateEntregadorDto } from './dto/update-entregador.dto';

@Controller('entregador')
export class EntregadorController {
  constructor(private readonly entregadorService: EntregadorService) {}

  @Post()
  create(@Body() createEntregadorDto: CreateEntregadorDto) {
    return this.entregadorService.create(createEntregadorDto);
  }

  @Get()
  findAll() {
    return this.entregadorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entregadorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntregadorDto: UpdateEntregadorDto) {
    return this.entregadorService.update(+id, updateEntregadorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entregadorService.remove(+id);
  }
}
