import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Database } from '../database';
import { resetDatabase } from '../test/helper/reset-database';
import { Product } from './entities/product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let database: Database;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      imports: [ConfigModule.forRoot({ envFilePath: '.env.test' })],
      providers: [ProductsService, {
        provide: getRepositoryToken(Product),
        useValue: (database = await Database.getInstance()).getRepository(Product),
      }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  afterAll(async () => {
    await resetDatabase(database);
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a product with id, name and quantity', async () => {
    const savedProduct = await controller.create({ name: 'asdf', quantity: 2 });

    expect(savedProduct.id).toBeDefined();
    expect(savedProduct.name).toBe('asdf');
    expect(savedProduct.quantity).toBe(2);
  });

  it('should get a product by id', async () => {
    const savedProduct = await controller.create({ name: 'New product', quantity: 20 });

    expect(savedProduct.id).toBeDefined();
    expect(savedProduct.name).toBe('New product');
    expect(savedProduct.quantity).toBe(20);

    const product = await controller.findOne(savedProduct.id);

    expect(product.id).toBe(savedProduct.id);
    expect(product.name).toBe(savedProduct.name);
    expect(product.quantity).toBe(savedProduct.quantity);
  })

  it('should update a product', async () => {
    const savedProduct = await controller.create({ name: 'New product', quantity: 20 });

    expect(savedProduct.id).toBeDefined();
    expect(savedProduct.name).toBe('New product');
    expect(savedProduct.quantity).toBe(20);

    const product = await controller.findOne(savedProduct.id);

    expect(product).toEqual({
      id: savedProduct.id,
      name: 'New product',
      quantity: 20,
    });

    const updatedProduct = await controller.update(product.id, {
      name: 'Updated product', quantity: 7,
    });

    expect(updatedProduct).toEqual({
      id: product.id,
      name: 'Updated product',
      quantity: 7,
    });
  });

  it('should delete a product', async () => {
    const savedProduct = await controller.create({ name: 'New product', quantity: 20 });

    expect(savedProduct.id).toBeDefined();
    expect(savedProduct.name).toBe('New product');
    expect(savedProduct.quantity).toBe(20);

    const affectedItems = await controller.remove(savedProduct.id);

    expect(affectedItems).toBe(1);

    const findedProduct = await controller.findOne(savedProduct.id);

    expect(findedProduct).toBe(null);
  })

  it('should get all products', async () => {
    const allProducts = await controller.findAll();
    expect(allProducts).toHaveLength(3);
  })
});
