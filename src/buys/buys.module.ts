import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { UsersModule } from '../users/users.module';
import { BuysController } from './buys.controller';
import { BuysService } from './buys.service';
import { BuyItem } from './entities/buy-item.entity';
import { Buy } from './entities/buy.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Buy, BuyItem, Product]), UsersModule],
  controllers: [BuysController],
  providers: [BuysService],
})
export class BuysModule { }
