import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { BuyItem } from '../buys/entities/buy-item.entity';
import { Buy } from '../buys/entities/buy.entity';
import { Database } from '../database';
import { Product } from '../products/entities/product.entity';
import { ProductsController } from '../products/products.controller';
import { User } from '../users/entities/user.entity';
import { UsersController } from '../users/users.controller';
import { resetDatabase } from './helper/reset-database';

describe('Buys Controller (e2e)', () => {
  let moduleFixture: TestingModule = null;
  let app: INestApplication;
  let appAPI: request.SuperTest<request.Test>;
  let database: Database;
  let user = new User({ username: 'User', password: 'asdf12' });
  let client = new User({ username: 'Client', password: 'asdf12' });
  let items: BuyItem[];

  const createSomeItems = async (numberOfProducts: number) => {
    const nProducts = [];
    for (let item = 1; item <= numberOfProducts; item += 1) {
      nProducts.push(new Product({
        name: `Product ${item} `,
        quantity: Math.trunc(Math.random() * 10) + 1,
      }));
    }

    const productsController = moduleFixture.get<ProductsController>(ProductsController);
    const createdProducts = await Promise.all(nProducts.map((product) => {
      return productsController.create(product);
    }))

    items = createdProducts.map((product) => {
      const buyPrice = Math.random() * 50;
      return new BuyItem({
        quantity: Math.trunc(Math.random() * product.quantity),
        buyPrice,
        sellPrice: buyPrice * 2.1,
        product,
      });
    }).filter((item) => item.quantity > 0);
  }

  const createAnUserAndAClient = async () => {
    const usersController = moduleFixture.get<UsersController>(UsersController);
    user = await usersController.create(user);
    client = await usersController.create(client);
  }


  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    appAPI = request(app.getHttpServer());

    database = await Database.getInstance();
    await resetDatabase(database);

    await createAnUserAndAClient();
    await createSomeItems(7);
  });

  afterAll(async () => {
    await resetDatabase(database);
    await app.close();
  })

  it('should return an error when request to /buys (POST) send a buy without items', async () => {
    const buy = new Buy({
      client,
      user,
    })

    const response = await appAPI.post('/buys').send(buy)

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: ['items should not be empty'],
    });
  });

  it('should return an error when request to /buys (POST) send a buy without user', async () => {
    const buy = new Buy({
      client,
      items,
    })

    const response = await appAPI.post('/buys').send(buy)

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: ['user must be a non-empty object'],
    });
  });

  it('should return an error when request to /buys (POST) send a buy without client', async () => {
    const buy = new Buy({
      user,
      items,
    })

    const response = await appAPI.post('/buys').send(buy)

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: ['client must be a non-empty object'],
    });
  });

  it('should return an error when request to /buys (POST) send a buy with a invalid user', async () => {
    const user = new User({ id: 0, username: 'John Doe' });
    const buy = new Buy({
      client,
      user,
      items,
    })

    const response = await appAPI.post('/buys').send(buy)
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: `The user with id ${user.id} doesn't exists`,
    });
  })

  it('should return an error when request to /buys (POST) send a buy with a invalid costumer', async () => {
    const client = new User({ id: 0, username: 'John Doe' });
    const buy = new Buy({
      client,
      user,
      items,
    })

    const response = await appAPI.post('/buys').send(buy)
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: `The client with id ${client.id} doesn't exists`,
    });
  })

  it('should save a buy', async () => {
    const buy = new Buy({
      client,
      user,
      items,
    })

    const response = await appAPI.post('/buys').send(buy)
    expect(response.status).toBe(201);
    const savedBuy: Buy = response.body;
    expect(savedBuy.id).toBeDefined();
    savedBuy.items.forEach((item, index) => {
      expect(item.id).toBeDefined();
      expect(item).toEqual({ ...buy.items[index], id: item.id });
    })
  });
});
