import { DataSource, DataSourceOptions } from 'typeorm';

export class Database {
  private static instance: Database = null;

  private dataSource: DataSource;

  private constructor() {
    const dataSourceOptions: DataSourceOptions = {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      entities: [`${__dirname}/../**/*.entity.{ts,js}`],
      synchronize: process.env.NODE_ENV !== 'production',
      // logging: 'all',
    };
    this.dataSource = new DataSource(dataSourceOptions);
  }

  public static async getInstance() {
    if (Database.instance === null) {
      Database.instance = new Database();
      await Database.instance.dataSource.initialize()
        .catch((err) => {
          console.error('Error during Data Source initialization', err)
        });
    }
    return Database.instance;
  }

  public getDataSource(): DataSource {
    return this.dataSource;
  }

  public getRepository(entityType) {
    return this.dataSource.getRepository(entityType);
  }
}