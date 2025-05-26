import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  @ApiProperty({ example: 'admin@exemplo.com' })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({ example: 'SenhaForte123' })
  password: string;
}