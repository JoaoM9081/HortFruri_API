import { Produto } from 'src/produto/entities/produto.entity';
export declare class Categoria {
    id: number;
    nome: string;
    descricao: string;
    produtos: Produto[];
}
