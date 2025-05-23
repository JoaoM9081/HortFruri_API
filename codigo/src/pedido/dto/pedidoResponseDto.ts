import { ItemPedidoResponseDto } from "../../itemPedido/dto/itemPedidoResponseDto";
import { StatusPedido } from "./StatusPedido";
import { EnderecoResponseDto } from "./EnderecoResponseDto";

export class PedidoResponseDto {
  id: number;
  status: StatusPedido;
  total: number;
  dataCriacao: Date;
  itens: ItemPedidoResponseDto[];
  endereco: EnderecoResponseDto;
  entregadorId ?: number;
}