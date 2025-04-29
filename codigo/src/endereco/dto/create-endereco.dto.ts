import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsPostalCode } from 'class-validator';

export class CreateEnderecoDto {
  @IsString()
  @ApiProperty({
    example: 'Avenida Paulista',  // Exemplo de rua
    description: 'Nome da rua ou avenida do endereço',
  })
  rua: string;

  @IsString()
  @ApiProperty({
    example: '1000',  // Exemplo de número
    description: 'Número do imóvel no endereço',
  })
  numero: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Apto 101',  // Exemplo de complemento
    description: 'Complemento do endereço, se houver',
    required: false,  // Indica que é um campo opcional
  })
  complemento?: string;

  @IsString()
  @ApiProperty({
    example: 'São Paulo',  // Exemplo de cidade
    description: 'Cidade do endereço',
  })
  cidade: string;

  @IsPostalCode('BR')
  @ApiProperty({
    example: '01311-000',  // Exemplo de CEP (código postal)
    description: 'CEP do endereço (código postal) no formato brasileiro',
  })
  cep: string;
}