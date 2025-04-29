import { PartialType } from '@nestjs/swagger';
import { CreateEntregadorDto } from './create-entregador.dto';

export class UpdateEntregadorDto extends PartialType(CreateEntregadorDto) {}
