import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { Database } from '../database';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { resetDatabase } from './helper/reset-database';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let appAPI: request.SuperTest<request.Test>;
  let database: Database;
  let user = new User({ username: 'User', password: 'asdf12' });
  let client = new User({ username: 'Client', password: 'asdf12' });
  let products: Product[];
  const createNProducts = async (numberOfProducts: number) => {
    const nProducts = [];
    for (let item = 1; item <= numberOfProducts; item += 1) {
      nProducts.push(new Product({
        name: `Product ${item} `,
        quantity: Math.trunc(Math.random() * 10) + 1,
      }));
    }

    const createdProducts = await Promise.all(nProducts.map(async (product) => {
      const response = await appAPI.post('/products').send(product);
      expect(response.status).toBe(201);
      const savedProduct: Product = response.body;
      const { id, name, quantity } = savedProduct;
      expect(id).toBeDefined();
      expect(name).toBe(product.name);
      expect(quantity).toBe(product.quantity);
      return savedProduct;
    }))
    return createdProducts;
  }


  beforeAll(async () => {


    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    appAPI = request(app.getHttpServer());

    database = await Database.getInstance();
    await resetDatabase(database);
  });

  afterAll(async () => {
    await app.close();
  })

  it('/users (POST) - Create an User', async () => {
    const response = await appAPI
      .post('/users')
      .send(user)

    expect(response.status).toBe(201);
    expect(typeof response.body).toBe('object');
    const savedUser = response.body as User;

    const { id, username, password } = savedUser;

    expect(id).toBeDefined();
    expect(username).toBe(user.username);
    expect(password).toBe(user.password);
    user = savedUser;
  })

  it('/users (POST) - Create a Client', async () => {
    const response = await appAPI
      .post('/users')
      .send(client)

    expect(response.status).toBe(201);
    expect(typeof response.body).toBe('object');
    const savedClient = response.body as User;

    const { id, username, password } = savedClient;

    expect(id).toBeDefined();
    expect(username).toBe(client.username);
    expect(password).toBe(client.password);
    client = savedClient;
  });

  it('/products (POST)', async () => {
    products = await createNProducts(5);
    expect(products).toHaveLength(5);
  })
});
