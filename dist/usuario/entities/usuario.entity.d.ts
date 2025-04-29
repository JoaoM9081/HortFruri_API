import { Consumidor } from "src/consumidor/entities/consumidor.entity";
import { Entregador } from "src/entregador/entities/entregador.entity";
import { Loja } from "src/loja/entities/loja.entity";
export declare class Usuario {
    id: number;
    email: string;
    senha: string;
    papel: 'CONSUMIDOR' | 'ENTREGADOR' | 'LOJA';
    criadoEm: Date;
    atualizadoEm: Date;
    consumidor: Consumidor;
    entregador: Entregador;
    loja: Loja;
}
