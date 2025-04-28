import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsumidorService } from './consumidor.service';
import { CreateConsumidorDto } from './dto/create-consumidor.dto';
import { UpdateConsumidorDto } from './dto/update-consumidor.dto';

@Controller('consumidor')
export class ConsumidorController {
  constructor(private readonly consumidorService: ConsumidorService) {}

  @Post()
  create(@Body() createConsumidorDto: CreateConsumidorDto) {
    return this.consumidorService.create(createConsumidorDto);
  }

  @Get()
  findAll() {
    return this.consumidorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumidorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsumidorDto: UpdateConsumidorDto) {
    return this.consumidorService.update(+id, updateConsumidorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consumidorService.remove(+id);
  }
}
