import { DeepPartial, Repository } from 'typeorm';

export abstract class BaseRestService<T> {

  constructor(protected repository: Repository<T>) { }

  create(entity: DeepPartial<T>) {
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find();
  }

  async remove(id: number) {
    return (await this.repository.delete(id)).affected;
  }

  abstract findOne(id: number): Promise<T>;

  abstract update(id: number, entityUpdated: Partial<T>): Promise<number>;

}
