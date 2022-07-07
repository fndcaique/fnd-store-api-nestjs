import { BuyItem } from 'src/buys/entities/buy-item.entity';
import { Transaction } from 'src/interfaces/transaction.interface';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Buy extends BaseEntity implements Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @OneToMany(() => BuyItem, (item) => item.buy)
  @JoinTable()
  items: BuyItem[];
}
