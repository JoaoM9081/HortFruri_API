export declare enum FormaPagamento {
    PIX = "PIX",
    CARTAO = "CARTAO",
    DINHEIRO = "DINHEIRO"
}
export declare enum StatusPagamento {
    PENDENTE = "PENDENTE",
    CONCLUIDO = "CONCLUIDO",
    FALHOU = "FALHOU"
}
export declare class CreatePagamentoDto {
    formaPagamento: FormaPagamento;
}
