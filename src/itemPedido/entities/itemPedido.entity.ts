import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Produto } from 'src/produto/entities/produto.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class ItemPedido {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Pedido, pedido => pedido.itens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'pedidoId' })
    pedido: Pedido;
  
    @ManyToOne(() => Produto, produto => produto.itensPedido, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'produtoId' })
    produto: Produto;
  
    @Column('int')
    quantidade: number;
  
    @Column('decimal', { precision: 10, scale: 2 })
    precoUnitario: number;
  }