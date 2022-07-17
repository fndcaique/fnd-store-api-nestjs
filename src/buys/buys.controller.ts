import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { BuysService } from './buys.service';
import { CreateBuyDto } from './dto/create-buy.dto';
import { UpdateBuyDto } from './dto/update-buy.dto';
import { Buy } from './entities/buy.entity';

@Controller('buys')
export class BuysController {
  constructor(private readonly buysService: BuysService) { }

  @Post()
  create(@Body() createBuyDto: CreateBuyDto) {
    const newBuy = new Buy(createBuyDto);
    return this.buysService.create(newBuy);
  }

  @Get()
  findAll() {
    return this.buysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.buysService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBuyDto: UpdateBuyDto) {
    return this.buysService.update(id, updateBuyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.buysService.remove(id);
  }
}
