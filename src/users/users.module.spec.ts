import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Database } from '../database';
import { resetDatabase } from '../test/helper/reset-database';
import { UsersController } from './users.controller';
import { UsersModule } from './users.module';

describe('UsersModule', () => {
  let controller: UsersController;
  let database: Database;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: '.env.test' }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          database: process.env.DB_DATABASE,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          entities: [`${__dirname}/**/*.entity.{ts,js}`],
          synchronize: process.env.NODE_ENV !== 'production',
          autoLoadEntities: true,
          logging: 'all',
        }),
        UsersModule
      ],
    }).compile();
    database = await Database.getInstance();

    controller = module.get<UsersController>(UsersController);

  });

  afterAll(async () => {
    await resetDatabase(database);
  })

  it('has a controlller defined', () => {
    expect(controller).toBeDefined();
  })


  it('should create a user with id, name and quantity', async () => {
    const savedUser = await controller.create({ username: 'asdf', password: '21dfT5$y' });

    expect(savedUser.id).toBeDefined();
    expect(savedUser.username).toBe('asdf');
    expect(savedUser.password).toBe('21dfT5$y');
  });

  it('should get a user by id', async () => {
    const savedUser = await controller.create({ username: 'New user', password: '#$T7asdf11' });

    expect(savedUser.id).toBeDefined();
    expect(savedUser.username).toBe('New user');
    expect(savedUser.password).toBe('#$T7asdf11');

    const user = await controller.findOne(savedUser.id);

    expect(user.id).toBe(savedUser.id);
    expect(user.username).toBe(savedUser.username);
    expect(user.password).not.toBeDefined();
  })

  it('should update a user', async () => {
    const savedUser = await controller.create({ username: 'New user', password: '#$T7asdf11' });

    expect(savedUser.id).toBeDefined();
    expect(savedUser.username).toBe('New user');

    const user = await controller.findOne(savedUser.id);

    expect(user).toEqual({
      id: savedUser.id,
      username: 'New user',
    });

    const updatedUser = await controller.update(user.id, {
      username: 'Updated user', password: '7',
    });

    expect(updatedUser).toEqual({
      id: user.id,
      username: 'Updated user',
      password: '7',
    });
  });

  it('should delete a user', async () => {
    const savedUser = await controller.create({ username: 'New user', password: '#$T7asdf11' });

    expect(savedUser.id).toBeDefined();
    expect(savedUser.username).toBe('New user');
    expect(savedUser.password).toBe('#$T7asdf11');

    const affectedItems = await controller.remove(savedUser.id);

    expect(affectedItems).toBe(1);

    const findedUser = await controller.findOne(savedUser.id);

    expect(findedUser).toBe(null);
  })

  it('should get all users', async () => {
    const allUsers = await controller.findAll();
    expect(allUsers).toHaveLength(3);
  })

});
