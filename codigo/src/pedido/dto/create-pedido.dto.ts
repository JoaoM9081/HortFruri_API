import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested} from 'class-validator';
import { CreateItemPedidoDto } from './createItemPedidoDto';

export class CreatePedidoDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemPedidoDto)
  @ApiProperty()
  itens: CreateItemPedidoDto[];
}