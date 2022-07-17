import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSellDto } from './dto/create-sell.dto';
import { UpdateSellDto } from './dto/update-sell.dto';
import { Sell } from './entities/sell.entity';
import { SellsService } from './sells.service';

@Controller('sells')
export class SellsController {
  constructor(private readonly sellsService: SellsService) { }

  @Post()
  create(@Body() createSellDto: CreateSellDto) {
    const newSell = new Sell(createSellDto);
    return this.sellsService.create(newSell);
  }

  @Get()
  findAll() {
    return this.sellsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellDto: UpdateSellDto) {
    return this.sellsService.update(+id, updateSellDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellsService.remove(+id);
  }
}
