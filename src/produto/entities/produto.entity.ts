import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Estoque } from 'src/estoque/entities/estoque.entity';
import { ItemPedido } from 'src/itemPedido/entities/itemPedido.entity';
import { Loja } from 'src/loja/entities/loja.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nome: string;
  
    @Column('decimal', { precision: 10, scale: 2 })
    preco: number;
  
    @ManyToOne(() => Categoria, categoria => categoria.produtos, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'categoriaId' })
    categoria: Categoria;
  
    @ManyToOne(() => Loja, loja => loja.produtos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'lojaId' })
    loja: Loja;
  
    @OneToMany(() => Estoque, estoque => estoque.produto, { cascade: true })
    estoques: Estoque[];
  
    @OneToMany(() => ItemPedido, item => item.produto)
    itensPedido: ItemPedido[];
  }