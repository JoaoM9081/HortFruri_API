import { Produto } from 'src/produto/entities/produto.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ nullable: true })
  descricao: string;

  @OneToMany(() => Produto, produto => produto.categoria)
  produtos: Produto[];
}