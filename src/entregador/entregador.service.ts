import { Injectable } from '@nestjs/common';
import { CreateEntregadorDto } from './dto/create-entregador.dto';
import { UpdateEntregadorDto } from './dto/update-entregador.dto';

@Injectable()
export class EntregadorService {
  create(createEntregadorDto: CreateEntregadorDto) {
    return 'This action adds a new entregador';
  }

  findAll() {
    return `This action returns all entregador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entregador`;
  }

  update(id: number, updateEntregadorDto: UpdateEntregadorDto) {
    return `This action updates a #${id} entregador`;
  }

  remove(id: number) {
    return `This action removes a #${id} entregador`;
  }
}
