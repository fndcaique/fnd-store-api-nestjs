import { IsDecimal, IsInt, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import {
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
export class BuyItem implements TransactionItem {

  constructor({ id, quantity, buyPrice, sellPrice, product }: Partial<BuyItem> = {}) {
    this.id = id;
    this.quantity = quantity;
    this.buyPrice = buyPrice;
    this.sellPrice = sellPrice;
    this.product = product;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @IsInt()
  @IsNotEmpty()
  @Column({ type: 'int', unsigned: true })
  quantity: number;

  @IsDecimal()
  @IsNotEmpty()
  @Column({ type: 'real', unsigned: true, name: 'buy_price' })
  buyPrice: number;

  @IsDecimal()
  @IsNotEmpty()
  @Column({ type: 'real', unsigned: true, name: 'sell_price' })
  sellPrice: number;

  @IsNotEmptyObject()
  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Buy, (buy) => buy.items, { nullable: false })
  @JoinColumn({ name: 'buy_id' })
  buy: Buy;
}
