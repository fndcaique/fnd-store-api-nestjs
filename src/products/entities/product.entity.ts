import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {

  constructor({ id = 0, name = '', quantity = 0 } = {}) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column({ type: 'int', unsigned: true })
  quantity: number;
}
