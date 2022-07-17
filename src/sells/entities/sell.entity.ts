import { Transaction } from 'src/interfaces/transaction.interface';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { SellItem } from './sell-item.entity';

@Entity()
export class Sell implements Transaction {

  constructor({ id, date, items }: Partial<Sell> = {}) {
    this.id = id;
    this.date = date || new Date();
    this.items = items;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @OneToMany(() => SellItem, (item) => item.sell)
  @JoinTable()
  items: [];
}
