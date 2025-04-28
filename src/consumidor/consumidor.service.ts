import { Injectable } from '@nestjs/common';
import { CreateConsumidorDto } from './dto/create-consumidor.dto';
import { UpdateConsumidorDto } from './dto/update-consumidor.dto';

@Injectable()
export class ConsumidorService {
  create(createConsumidorDto: CreateConsumidorDto) {
    return 'This action adds a new consumidor';
  }

  findAll() {
    return `This action returns all consumidor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consumidor`;
  }

  update(id: number, updateConsumidorDto: UpdateConsumidorDto) {
    return `This action updates a #${id} consumidor`;
  }

  remove(id: number) {
    return `This action removes a #${id} consumidor`;
  }
}
