import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { copyObject } from '../test/helper/copy-object';
import { mockedProducts } from '../test/mocks/mockedProducts';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

let products = copyObject(mockedProducts);

const mockedProductRepository = {
  save: jest.fn((product) => {
    product.id = products[products.length - 1].id + 1;
    products.push(product);
    return product;
  }),
  find: jest.fn(() => products),
  findOne: jest.fn(({ where: { id } }) => products.find(product => product.id === id)),
  delete: jest.fn((id) => products = products.filter(product => product.id !== id)),
  update: jest.fn((id, newData) => {
    const index = products.findIndex(product => product.id === id);
    if (index >= 0) {
      products[index] = { ...products[index], ...newData }
      return { affected: 1 };
    }
    return { affected: 0 };
  }),
}

describe('ProductsService', () => {
  let service: ProductsService;

  const createNProducts = (n) => {
    const nProducts = [];
    for (let item = 1; item <= n; item += 1) {
      nProducts.push(new Product({
        name: `Product ${item} `,
        quantity: Math.trunc(Math.random() * 10) + 1,
      }));
    }

    return Promise.all(nProducts.map((product) => service.create(product)))
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ envFilePath: '.env.test' })],
      providers: [ProductsService, {
        provide: getRepositoryToken(Product),
        useValue: mockedProductRepository,
      }],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  afterEach(async () => {
    products = copyObject(mockedProducts);
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  });

  it('should create a product with a new id', async () => {
    const product = new Product({ name: 'Product 1', quantity: 3 });
    const savedProduct = await service.create(product);
    expect(savedProduct.id).toBeDefined();
    expect(savedProduct).toEqual({ id: savedProduct.id, name: 'Product 1', quantity: 3 });
  });

  it('should create 5 products and get all of then', async () => {
    const fiveProducts = await createNProducts(5);
    const allProducts = await service.findAll();
    expect(allProducts).toHaveLength(9);

    fiveProducts.forEach((product) => {
      expect(allProducts).toContainEqual(product)
    })
  });

  it('should find a product', async () => {
    const [, product2] = await createNProducts(2);
    expect(await service.findOne(product2.id)).toEqual(product2);
  })

  it('should update a product', async () => {
    const [product] = await createNProducts(1);
    const name = 'Other name';
    const quantity = 3;
    expect(product).not.toEqual({ id: 1, name, quantity });
    const updatedRows = await service.update(product.id, { name, quantity });
    expect(updatedRows).toBe(1);
    expect(await service.findOne(product.id)).toEqual({ id: product.id, name, quantity });
  })

  it('should delete a product with id 3', async () => {
    const [, , productToDelete] = await createNProducts(5);
    const allProducts = await service.findAll();
    expect(allProducts).toHaveLength(9);
    await service.remove(productToDelete.id);
    const newAllProducts = await service.findAll();
    expect(newAllProducts).toHaveLength(8);
    expect(newAllProducts).not.toContainEqual(productToDelete);
  })

});
