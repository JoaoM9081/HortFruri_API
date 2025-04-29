import { Pedido } from "src/pedido/entities/pedido.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
export declare class Entregador {
    id: number;
    nome: string;
    telefone: string;
    veiculo: string;
    placa: string;
    usuario: Usuario;
    pedidos: Pedido[];
}
