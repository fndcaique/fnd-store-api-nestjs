import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRestService } from '../common/base-rest.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService extends BaseRestService<Product> {
  constructor(
    @InjectRepository(Product) repository: Repository<Product>
  ) {
    super(repository);
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return (await this.repository.update(id, updateProductDto)).affected;
  }
}
