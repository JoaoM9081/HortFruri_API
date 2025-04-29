export declare enum OrdenacaoCatalogo {
    PRECO_ASC = "PRECO_ASC",
    PRECO_DESC = "PRECO_DESC",
    MAIS_VENDIDOS = "MAIS_VENDIDOS"
}
export declare class FiltroCatalogoDto {
    nome?: string;
    categoriaId?: number;
    minPreco?: number;
    maxPreco?: number;
    disponivel?: boolean;
    ordenacao?: OrdenacaoCatalogo;
}
