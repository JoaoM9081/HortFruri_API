// src/avaliacao/dto/avaliacao-response.dto.ts
export class AvaliacaoResponseDto {
  id: number;
  nota: number;
  comentario?: string;
  dataCriacao: Date;
}
