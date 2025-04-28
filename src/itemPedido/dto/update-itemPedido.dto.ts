import { PartialType } from '@nestjs/swagger';
import { CreateItemPedidoDto } from './create-itemPedido.dto';

export class UpdateItemPedidoDto extends PartialType(CreateItemPedidoDto) {}
