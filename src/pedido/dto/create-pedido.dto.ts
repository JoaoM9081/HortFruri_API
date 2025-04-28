import { Type } from 'class-transformer';
import { IsArray, IsEnum, ValidateNested} from 'class-validator';
import { CreateItemPedidoDto } from 'src/itemPedido/dto/create-itemPedido.dto';

export class CreatePedidoDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemPedidoDto)
  itens: CreateItemPedidoDto[];
}