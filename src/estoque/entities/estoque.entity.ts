import { Loja } from 'src/loja/entities/loja.entity';
import { Produto } from 'src/produto/entities/produto.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Estoque {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Produto, produto => produto.estoques, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'produtoId' })
    produto: Produto;
  
    @ManyToOne(() => Loja, loja => loja.estoques, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'lojaId' })
    loja: Loja;
  
    @Column('int')
    quantidadeDisponivel: number;
  
    @UpdateDateColumn()
    dataAtualizacao: Date;
  }