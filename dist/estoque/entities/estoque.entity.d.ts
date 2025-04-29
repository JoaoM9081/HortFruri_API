import { Loja } from 'src/loja/entities/loja.entity';
import { Produto } from 'src/produto/entities/produto.entity';
export declare class Estoque {
    id: number;
    produto: Produto;
    loja: Loja;
    quantidadeDisponivel: number;
    dataAtualizacao: Date;
}
