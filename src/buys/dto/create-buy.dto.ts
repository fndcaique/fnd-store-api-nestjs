import { User } from '../../users/entities/user.entity';
import { BuyItem } from './../entities/buy-item.entity';

export class CreateBuyDto {
  user: User;
  items: BuyItem[];
  date?: Date;
}
