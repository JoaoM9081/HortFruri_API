import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAvaliacaoDto {
  @IsInt() @Min(1) @Max(5)
  @ApiProperty({ example: 4, description: 'Nota de 1 a 5' })
  nota: number;

  @IsString() @IsOptional() @MaxLength(500)
  @ApiProperty({ example: 'Entrega rápida e tudo ok', required: false })
  comentario?: string;
}