import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested} from 'class-validator';
import { CreateItemPedidoDto } from '../../itemPedido/dto/createItemPedidoDto';

export class CreatePedidoDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemPedidoDto)  
  @ApiProperty({
    type: [CreateItemPedidoDto],  
    description: 'Lista de itens do pedido',
  })
  itens: CreateItemPedidoDto[];
}