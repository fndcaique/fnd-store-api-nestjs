import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Database } from '../database';
import { resetDatabase } from '../test/helper/reset-database';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let database: Database;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [ConfigModule.forRoot({ envFilePath: '.env.test' })],
      providers: [UsersService, {
        provide: getRepositoryToken(User),
        useValue: (database = await Database.getInstance()).getRepository(User),
      }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    await resetDatabase(database);
  })

  it('should be defined', () => {
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
