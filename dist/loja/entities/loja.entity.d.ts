import { Endereco } from 'src/endereco/entities/endereco.entity';
import { Estoque } from 'src/estoque/entities/estoque.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Produto } from 'src/produto/entities/produto.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
export declare class Loja {
    id: number;
    nome: string;
    cnpj: string;
    telefone: string;
    usuario: Usuario;
    endereco: Endereco;
    produtos: Produto[];
    estoques: Estoque[];
    pedidos: Pedido[];
}
