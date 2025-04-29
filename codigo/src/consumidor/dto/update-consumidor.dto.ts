import { PartialType } from '@nestjs/swagger';
import { CreateConsumidorDto } from './create-consumidor.dto';

export class UpdateConsumidorDto extends PartialType(CreateConsumidorDto) {}
