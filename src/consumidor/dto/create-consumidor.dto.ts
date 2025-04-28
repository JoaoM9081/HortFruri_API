import { IsString, IsPhoneNumber } from 'class-validator';

export class CreateConsumidorDto {
  @IsString()
  nome: string;

  @IsPhoneNumber('BR')
  telefone: string;
}