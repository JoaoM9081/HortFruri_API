import { IsString, IsPhoneNumber, Matches, Length } from 'class-validator';

export class CreateLojaDto {
  @IsString()
  nome: string;

  @Matches(/^[0-9]+$/, { message: 'CNPJ deve conter apenas números' })
  @Length(14, 14, { message: 'CNPJ deve ter exatamente 14 dígitos' })
  cnpj: string;

  @IsPhoneNumber('BR')
  telefone: string;
}