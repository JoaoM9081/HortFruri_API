import { Pedido } from "src/pedido/entities/pedido.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
export declare class Consumidor {
    id: number;
    nome: string;
    telefone: string;
    usuario: Usuario;
    pedidos: Pedido[];
}
