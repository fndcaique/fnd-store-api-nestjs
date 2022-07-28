import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

  constructor({ id, username, password }: Partial<User> = {}) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;
}
