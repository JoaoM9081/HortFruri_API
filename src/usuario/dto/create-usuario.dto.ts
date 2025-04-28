import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  senha: string;

  @IsEnum([ 'CONSUMIDOR', 'ENTREGADOR', 'LOJA' ])
  papel: 'CONSUMIDOR' | 'ENTREGADOR' | 'LOJA';
}