import { Transaction } from 'src/interfaces/transaction.interface';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SellItem } from './sell-item.entity';

@Entity()
export class Sell implements Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @OneToMany(() => SellItem, (item) => item.sell)
  @JoinTable()
  items: [];
}
