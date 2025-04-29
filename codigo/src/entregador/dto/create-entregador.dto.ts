import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber, IsEmail, Min, MinLength } from 'class-validator';

export class CreateEntregadorDto {
  @IsString()
  @ApiProperty()
  nome: string;

  @IsPhoneNumber('BR', { message: 'Número de telefone inválido. O formato deve ser +55 [DDD] [Número]' })
  @ApiProperty()
  telefone: string;

  @IsString()
  @ApiProperty()
  veiculo: string;

  @IsString()
  @ApiProperty()
  placa: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  @MinLength(6)
  senha: string;
}