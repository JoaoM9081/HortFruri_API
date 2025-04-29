import { ItemPedidoResponseDto } from "src/itemPedido/dto/itemPedidoResponseDto";
import { StatusPedido } from "./StatusPedido";
export declare class PedidoResponseDto {
    id: number;
    status: StatusPedido;
    total: number;
    dataCriacao: Date;
    itens: ItemPedidoResponseDto[];
}
