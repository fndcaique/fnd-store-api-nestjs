// import { TransactionItem } from '../products/entities/transaction-item.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { TransactionItem } from '../../interfaces/transaction-item.interface';
import { Product } from '../../products/entities/product.entity';
import { Buy } from './buy.entity';

@Entity()
export class BuyItem extends BaseEntity implements TransactionItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unsigned: true })
  quantity: number;

  @Column({ type: 'real', unsigned: true, name: 'buy_price' })
  buyPrice: number;

  @Column({ type: 'real', unsigned: true, name: 'sell_price' })
  sellPrice: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Buy, (buy) => buy.items)
  @JoinColumn({ name: 'buy_id' })
  buy: Buy;
}
