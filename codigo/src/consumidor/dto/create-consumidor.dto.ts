import { IsString, IsPhoneNumber, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConsumidorDto {
  @IsString()
  @ApiProperty({
    example: 'João Silva',  // Exemplo de nome
    description: 'Nome completo do consumidor',
  })
  nome: string;

  @IsPhoneNumber('BR', { message: 'Número de telefone inválido. O formato deve ser +55 [DDD] [Número]' })
  @ApiProperty({
    example: '+55 11 91234-5678',  // Exemplo de telefone
    description: 'Número de telefone do consumidor no formato brasileiro',
  })
  telefone: string;

  @IsEmail()
  @ApiProperty({
    example: 'joao.silva@example.com',  
    description: 'Endereço de e-mail do consumidor',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    example: 'senha123',  // Exemplo de senha
    description: 'Senha do consumidor (mínimo de 6 caracteres)',
  })
  senha: string;
}