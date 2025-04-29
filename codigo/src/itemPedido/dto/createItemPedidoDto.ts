import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Min } from "class-validator";

export class CreateItemPedidoDto {

    @IsInt()
    @Min(1)
    @ApiProperty({
      description: 'Quantidade do produto no pedido',
      example: 2,  
    })
    quantidade: number;

    @IsString()
    @ApiProperty({
      description: 'Nome do produto no pedido',
      example: 'Banana', 
    })
    produtoNome: string;
  }