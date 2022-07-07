import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuysModule } from './buys/buys.module';
import { ProductsModule } from './products/products.module';
import { SellsModule } from './sells/sells.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      entities: [`${__dirname}/**/*.entity.{ts,js}`],
      synchronize: process.env.NODE_ENV === 'development',
      autoLoadEntities: true,
    }),
    ProductsModule,
    UsersModule,
    BuysModule,
    SellsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

console.log({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: [`${__dirname}/**/*.entity.{ts,js}`],
  synchronize: process.env.NODE_ENV === 'development',
  autoLoadEntities: true,
});
