import { Consumidor } from 'src/consumidor/entities/consumidor.entity';
import { Entregador } from 'src/entregador/entities/entregador.entity';
import { ItemPedido } from 'src/itemPedido/entities/itemPedido.entity';
import { Loja } from 'src/loja/entities/loja.entity';
import { Pagamento } from 'src/pagamento/entities/pagamento.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn } from 'typeorm';
import { StatusPedido } from '../dto/StatusPedido';
import { Endereco } from 'src/endereco/entities/endereco.entity';
import { Avaliacao } from 'src/avaliacao/entities/avaliacao.entity';

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'text' })
    status: StatusPedido;
  
    @ManyToOne(() => Consumidor, consumidor => consumidor.pedidos, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'consumidorId' })
    consumidor: Consumidor;
  
    @ManyToOne(() => Loja, loja => loja.pedidos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'lojaId' })
    loja: Loja;
  
    @ManyToOne(() => Entregador, entregador => entregador.pedidos, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'entregadorId' })
    entregador: Entregador;
  
    @OneToMany(() => ItemPedido, item => item.pedido, { cascade: ['insert', 'update', 'remove'] })
    itens: ItemPedido[];
  
    @OneToMany(() => Pagamento, pagamento => pagamento.pedido, { cascade: ['insert', 'update', 'remove'] })
    pagamentos: Pagamento[];
  
    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @ManyToOne(() => Endereco, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'enderecoId' })
    endereco: Endereco;

    @CreateDateColumn()
    dataCriacao: Date;

    @OneToMany(() => Avaliacao, a => a.pedido)
    avaliacoes: Avaliacao[];
  }