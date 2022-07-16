import { Transaction } from 'src/interfaces/transaction.interface';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SellItem } from './sell-item.entity';

@Entity()
export class Sell extends BaseEntity implements Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @OneToMany(() => SellItem, (item) => item.sell)
  @JoinTable()
  items: [];
}
