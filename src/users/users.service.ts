import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRestService } from 'src/common/base-rest.service';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends BaseRestService<User> {
  constructor(@InjectRepository(User) repository: Repository<User>) {
    super(repository);
  }

  findOne(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const result = await this.repository.update(id, updateUserDto);
    return result.affected;
  }
}
