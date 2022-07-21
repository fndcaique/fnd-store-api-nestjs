import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

interface ProductOptions {
  id?: number;
  name?: string;
  quantity?: number;
}

@Entity()
export class Product {

  constructor({ id, name, quantity }: ProductOptions = {}) {
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
