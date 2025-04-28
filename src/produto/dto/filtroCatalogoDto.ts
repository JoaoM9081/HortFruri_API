import { IsOptional, IsString, IsInt, IsNumber, IsBoolean, IsEnum } from 'class-validator';

export enum OrdenacaoCatalogo {
  PRECO_ASC = 'PRECO_ASC',
  PRECO_DESC = 'PRECO_DESC',
  MAIS_VENDIDOS = 'MAIS_VENDIDOS',
}

export class FiltroCatalogoDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsInt()
  categoriaId?: number;

  @IsOptional()
  @IsNumber()
  minPreco?: number;

  @IsOptional()
  @IsNumber()
  maxPreco?: number;

  @IsOptional()
  @IsBoolean()
  disponivel?: boolean;

  @IsOptional()
  @IsEnum(OrdenacaoCatalogo)
  ordenacao?: OrdenacaoCatalogo;
}