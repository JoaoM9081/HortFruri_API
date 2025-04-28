import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Pagamento {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Pedido, pedido => pedido.pagamentos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'pedidoId' })
    pedido: Pedido;
  
    @Column({ type: 'enum', enum: ['PIX', 'CARTAO', 'DINHEIRO'] })
    formaPagamento: 'PIX' | 'CARTAO' | 'DINHEIRO';
  
    @Column({ type: 'enum', enum: ['PENDENTE', 'CONCLUIDO', 'FALHOU'] })
    status: 'PENDENTE' | 'CONCLUIDO' | 'FALHOU';
  
    @Column('decimal', { precision: 10, scale: 2 })
    valorPago: number;
  
    @CreateDateColumn()
    dataPagamento: Date;
  }