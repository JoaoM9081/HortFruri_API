import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty()
  senha: string;

  @IsEnum([ 'CONSUMIDOR', 'ENTREGADOR', 'LOJA' ])
  @ApiProperty()
  papel: 'CONSUMIDOR' | 'ENTREGADOR' | 'LOJA';
}