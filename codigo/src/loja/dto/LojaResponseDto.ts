export class LojaResponseDto {
    id: number;
    nome: string;
    cnpj: string;
    telefone: string;
    email: string;
    endereco: {
        id: number;
        rua: string;
        numero: string;
        complemento?: string;
        cidade: string;
        cep: string;
    };
    imagemUrl?: string;
  }
  