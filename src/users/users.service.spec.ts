import { faker } from '@faker-js/faker';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createMockedRepository } from '../test/mocks/createMockedRepository';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const mockedRepository = createMockedRepository();

describe('UsersService', () => {
  let service: UsersService;

  const createNUsers = (n) => {
    const nUsers = [];
    for (let item = 1; item <= n; item += 1) {
      nUsers.push(new User({
        username: faker.internet.userName(),
        password: faker.internet.password(),
      }));
    }

    return Promise.all(nUsers.map((user) => service.create(user)))
  }

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ envFilePath: '.env.test' })],
      providers: [UsersService, {
        provide: getRepositoryToken(User),
        useValue: mockedRepository,
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    mockedRepository.resetItems();
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user with a new id', async () => {
    const user = new User({ username: 'fndcaique', password: 'asdf1234' });
    const savedUser = await service.create(user);
    expect(savedUser.id).toBeDefined();
    expect(savedUser).toEqual({
      id: savedUser.id,
      username: 'fndcaique',
      password: 'asdf1234',
    });
  });

  it('should create 5 users and get all of then', async () => {
    const fiveUsers = await createNUsers(5);
    const allUsers = await service.findAll();
    expect(allUsers).toHaveLength(5);

    fiveUsers.forEach((user) => {
      expect(allUsers).toContainEqual(user)
    })
  });

  it('should find a user', async () => {
    const [, user2] = await createNUsers(2);
    expect(await service.findOne(user2.id)).toEqual(user2);
  })

  it('should update a user', async () => {
    const [user] = await createNUsers(1);
    const username = 'Other username';
    const password = 'www#.$321@com';
    expect(user).not.toEqual({ id: 1, username, password });
    const updatedRows = await service.update(user.id, { username, password });
    expect(updatedRows).toBe(1);
    expect(await service.findOne(user.id)).toEqual({ id: user.id, username, password });
  })

  it('should delete a user with id 3', async () => {
    const [, , userToDelete] = await createNUsers(5);
    const allUsers = await service.findAll();
    expect(allUsers).toHaveLength(5);
    await service.remove(userToDelete.id);
    const newAllUsers = await service.findAll();
    expect(newAllUsers).toHaveLength(4);
    expect(newAllUsers).not.toContainEqual(userToDelete);
  })
});
