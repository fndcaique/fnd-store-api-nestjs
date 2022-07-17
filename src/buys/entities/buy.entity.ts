import { BuyItem } from 'src/buys/entities/buy-item.entity';
import { Transaction } from 'src/interfaces/transaction.interface';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Buy implements Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @ManyToOne(() => User)
  @JoinColumn({name: 'user_id'})
  user: User;

  @OneToMany(() => BuyItem, (item) => item.buy)
  @JoinTable()
  items: BuyItem[];
}
