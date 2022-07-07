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

@Controller('buys')
export class BuysController {
  constructor(private readonly buysService: BuysService) {}

  @Post()
  create(@Body() createBuyDto: CreateBuyDto) {
    return this.buysService.create(createBuyDto);
  }

  @Get()
  findAll() {
    return this.buysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.buysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuyDto: UpdateBuyDto) {
    return this.buysService.update(+id, updateBuyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buysService.remove(+id);
  }
}
