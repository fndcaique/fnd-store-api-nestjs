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

  constructor({ id, date, user, client, items }: Partial<Buy> = {}) {
    this.id = id;
    this.date = date || new Date();
    this.user = user;
    this.client = client;
    this.items = items;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'client_id' })
  client: User;

  @OneToMany(
    () => BuyItem,
    (item) => item.buy,
    { cascade: true, nullable: false }
  )
  @JoinTable()
  items: BuyItem[];
}
