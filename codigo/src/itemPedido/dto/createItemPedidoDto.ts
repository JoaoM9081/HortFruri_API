import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min } from "class-validator";

export class CreateItemPedidoDto {

    @IsInt()
    @Min(1)
    @ApiProperty()
    quantidade: number;
  
    @IsInt()
    @Min(1)
    @ApiProperty()
    produtoId: number;
  }