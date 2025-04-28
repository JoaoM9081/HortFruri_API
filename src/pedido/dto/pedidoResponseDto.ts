import { ItemPedidoResponseDto } from "src/itemPedido/dto/itemPedidoResponseDto";
import { StatusPedido } from "./StatusPedido";

export class PedidoResponseDto {
  id: number;
  status: StatusPedido;
  total: number;
  dataCriacao: Date;
  itens: ItemPedidoResponseDto[];
}