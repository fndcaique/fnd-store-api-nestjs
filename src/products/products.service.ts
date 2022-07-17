import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRestService } from 'src/common/base-rest.service';
import { Repository } from 'typeorm';
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
    const result = await this.repository.update(id, updateProductDto);
    return result.affected;
  }
}
