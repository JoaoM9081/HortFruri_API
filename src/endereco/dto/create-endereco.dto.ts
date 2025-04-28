import { IsString, IsOptional, IsPostalCode } from 'class-validator';

export class CreateEnderecoDto {
  @IsString()
  rua: string;

  @IsString()
  numero: string;

  @IsOptional()
  @IsString()
  complemento?: string;

  @IsString()
  cidade: string;

  @IsPostalCode('BR')
  cep: string;
}