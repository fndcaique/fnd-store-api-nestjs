import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { Database } from '../database';
import { Product } from '../products/entities/product.entity';
import { resetDatabase } from './helper/reset-database';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let appAPI: request.SuperTest<request.Test>;
  let database: Database;
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
    await resetDatabase(database);
    await app.close();
  })

  it('/products (POST)', async () => {
    products = await createNProducts(5);
    expect(products).toHaveLength(5);
  });

  it('/products (GET)', async () => {
    const response = await appAPI.get('/products');
    const { status, body: savedProducts } = response;
    expect(status).toBe(200);
    expect(savedProducts).toHaveLength(products.length);
    savedProducts.forEach(product => {
      const productMatch = products.find(({ id }) => id === product.id);
      expect(product).toMatchObject(productMatch);
    });
  })
});
