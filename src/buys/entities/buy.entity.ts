import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { BuyItem } from '../../buys/entities/buy-item.entity';
import { Transaction } from '../../interfaces/transaction.interface';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Buy implements Transaction {

  constructor({ id, date, user, items }: Partial<Buy> = {}) {
    this.id = id;
    this.date = date || new Date();
    this.user = user;
    this.items = items;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => BuyItem, (item) => item.buy)
  @JoinTable()
  items: BuyItem[];
}
