import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber, IsEmail, Matches, Length, MinLength } from 'class-validator';

export class CreateLojaDto {
  @IsString()
  @ApiProperty({
    example: 'Loja Hortifruti Exemplo',  // Exemplo de nome da loja
    description: 'Nome da loja, deve ser o nome completo ou fantasia da loja.',
  })
  nome: string;

  @Matches(/^[0-9]+$/, { message: 'CNPJ deve conter apenas números' })
  @Length(14, 14, { message: 'CNPJ deve ter exatamente 14 dígitos' })
  @ApiProperty({
    example: '12345678000190',  // Exemplo de CNPJ (sem pontuação)
    description: 'CNPJ da loja, deve ter exatamente 14 dígitos numéricos.',
  })
  cnpj: string;

  @IsPhoneNumber('BR')
  @ApiProperty({
    example: '+55 11 91234-5678',  // Exemplo de número de telefone da loja
    description: 'Número de telefone da loja no formato brasileiro.',
  })
  telefone: string;

  @IsEmail()
  @ApiProperty({
    example: 'contato@lojahortifruti.com',  // Exemplo de email da loja
    description: 'Endereço de e-mail para contato com a loja.',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'senhaSegura123',  // Exemplo de senha para acessar o sistema
    description: 'Senha de acesso da loja (mínimo de 6 caracteres).',
  })
  @MinLength(6)
  senha: string;
}