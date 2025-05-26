import { EnderecoResponseDto } from "./EnderecoResponseDto";

export class EntregadorPedidoDto {
  pedidoId: number;

  /** Endereço de recepção: onde o entregador pega o pedido (endereço da loja) */
  enderecoRecepcao: EnderecoResponseDto;

  /** Endereço de entrega: onde o consumidor quer receber */
  enderecoEntrega: EnderecoResponseDto;
}
