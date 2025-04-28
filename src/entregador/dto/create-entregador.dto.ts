import { IsString, IsPhoneNumber } from 'class-validator';

export class CreateEntregadorDto {
  @IsString()
  nome: string;

  @IsPhoneNumber('BR')
  telefone: string;

  @IsString()
  veiculo: string;

  @IsString()
  placa: string;
}