import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber, IsEmail, MinLength } from 'class-validator';

export class CreateEntregadorDto {
  @IsString()
  @ApiProperty({
    example: 'João Silva',  // Exemplo de nome do entregador
    description: 'Nome completo do entregador',
  })
  nome: string;

  @IsPhoneNumber('BR', { message: 'Número de telefone inválido. O formato deve ser +55 [DDD] [Número]' })
  @ApiProperty({
    example: '+55 11 91234-5678',  // Exemplo de telefone
    description: 'Número de telefone do entregador no formato brasileiro',
  })
  telefone: string;

  @IsString()
  @ApiProperty({
    example: 'Fiorino',  // Exemplo de tipo de veículo
    description: 'Tipo de veículo utilizado pelo entregador para realizar as entregas',
  })
  veiculo: string;

  @IsString()
  @ApiProperty({
    example: 'ABC1234',  // Exemplo de placa de veículo
    description: 'Placa do veículo utilizado pelo entregador',
  })
  placa: string;

  @IsEmail()
  @ApiProperty({
    example: 'joao.silva@example.com',  // Exemplo de email do entregador
    description: 'Endereço de email do entregador para contato',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'senhaSegura123',  // Exemplo de senha
    description: 'Senha para o acesso do entregador no sistema (mínimo de 6 caracteres)',
  })
  @MinLength(6)
  senha: string;
}
