import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Estoque } from 'src/estoque/entities/estoque.entity';
import { ItemPedido } from 'src/itemPedido/entities/itemPedido.entity';
import { Loja } from 'src/loja/entities/loja.entity';
export declare class Produto {
    id: number;
    nome: string;
    preco: number;
    categoria: Categoria;
    loja: Loja;
    estoques: Estoque[];
    itensPedido: ItemPedido[];
}
