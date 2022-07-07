import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  name: string;

  @Column({ type: 'int', unsigned: true })
  quantity: number;
}
