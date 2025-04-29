import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Produto } from 'src/produto/entities/produto.entity';
export declare class ItemPedido {
    id: number;
    pedido: Pedido;
    produto: Produto;
    quantidade: number;
    precoUnitario: number;
}
