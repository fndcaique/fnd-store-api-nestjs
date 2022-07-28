import { ArrayNotEmpty, IsNotEmptyObject } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { BuyItem } from '../entities/buy-item.entity';

export class CreateBuyDto {
  @IsNotEmptyObject()
  user: User;

  @IsNotEmptyObject()
  client: User;

  @ArrayNotEmpty()
  items: BuyItem[];

  date?: Date;
}
