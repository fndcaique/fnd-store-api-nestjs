import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { BuysService } from './buys.service';
import { CreateBuyDto } from './dto/create-buy.dto';
import { UpdateBuyDto } from './dto/update-buy.dto';
import { Buy } from './entities/buy.entity';

@Controller('buys')
export class BuysController {
  constructor(private readonly buysService: BuysService, private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createBuyDto: CreateBuyDto) {
    const userExists = await this.usersService.findOne(createBuyDto.user.id);
    if (!userExists) {
      throw new BadRequestException(`The user with id ${createBuyDto.user.id} doesn't exists`);
    }

    const clientExists = await this.usersService.findOne(createBuyDto.client.id);
    if (!clientExists) {
      throw new BadRequestException(`The client with id ${createBuyDto.client.id} doesn't exists`);
    }
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
