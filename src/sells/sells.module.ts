import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { SellItem } from './entities/sell-item.entity';
import { Sell } from './entities/sell.entity';
import { SellsController } from './sells.controller';
import { SellsService } from './sells.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sell, SellItem, Product])],
  controllers: [SellsController],
  providers: [SellsService],
})
export class SellsModule { }
