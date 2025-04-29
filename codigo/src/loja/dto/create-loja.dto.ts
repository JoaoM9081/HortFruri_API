import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber, Matches, Length } from 'class-validator';

export class CreateLojaDto {
  @IsString()
  @ApiProperty()
  nome: string;

  @Matches(/^[0-9]+$/, { message: 'CNPJ deve conter apenas números' })
  @Length(14, 14, { message: 'CNPJ deve ter exatamente 14 dígitos' })
  @ApiProperty()
  cnpj: string;

  @IsPhoneNumber('BR')
  @ApiProperty()
  telefone: string;
}