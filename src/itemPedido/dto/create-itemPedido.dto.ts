import { IsInt, Min, IsNumber } from 'class-validator';

export class CreateItemPedidoDto {

  @IsInt()
  @Min(1)
  quantidade: number;
}