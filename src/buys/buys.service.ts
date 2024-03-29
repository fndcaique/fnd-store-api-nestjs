import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRestService } from '../common/base-rest.service';
import { Buy } from './entities/buy.entity';

@Injectable()
export class BuysService extends BaseRestService<Buy> {
  constructor(
    @InjectRepository(Buy) repository: Repository<Buy>
  ) {
    super(repository);
  }

  findOne(id: number): Promise<Buy> {
    throw new Error('Method not implemented.');
  }
  update(id: number, entityUpdated: Partial<Buy>): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
