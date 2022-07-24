import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { TransactionItem } from '../../interfaces/transaction-item.interface';
import { Product } from '../../products/entities/product.entity';
import { Sell } from './sell.entity';

@Entity()
export class SellItem implements TransactionItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ type: 'real', unsigned: true, name: 'buy_price' })
  buyPrice: number;

  @Column({ type: 'real', unsigned: true, name: 'sell_price' })
  sellPrice: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Sell, (sell) => sell.items)
  @JoinColumn({ name: 'sell_id' })
  sell: Sell;
}
