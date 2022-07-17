import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRestService } from 'src/common/base-rest.service';
import { DeepPartial, Repository } from 'typeorm';
import { Sell } from './entities/sell.entity';

@Injectable()
export class SellsService extends BaseRestService<Sell> {
  constructor(@InjectRepository(Sell) repository: Repository<Sell>) {
    super(repository);
  }

  findOne(id: number): Promise<Sell> {
    return this.repository.findOne({ where: { id } });
  }

  update(id: number, updateDto: DeepPartial<Sell>): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
