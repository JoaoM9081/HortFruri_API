import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber, IsEmail, min, Min, MinLength } from 'class-validator';

export class CreateConsumidorDto {
  @IsString()
  @ApiProperty()
  nome: string;

  @IsPhoneNumber('BR', { message: 'Número de telefone inválido. O formato deve ser +55 [DDD] [Número]' })
  @ApiProperty()
  telefone: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty()
  senha: string;
}