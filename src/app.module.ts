import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
const SnakeNamingStrategy = require('typeorm-naming-strategies')
  .SnakeNamingStrategy;

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '174.129.187.48',
    port: 3306,
    username: 'paul',
    password: 'password',
    database: 'exchange_db',
    synchronize: false,
    retryDelay: 3000,
    retryAttempts: 10,
    entities: [join(__dirname, '**/*.entity{.ts,.js}'), join(__dirname, '**', '*.entity.{ts,js}')],
    migrationsTableName: 'migration',
    migrations: ['src/migration/*.ts'],
    namingStrategy: new SnakeNamingStrategy(),
    logging: true
  }), TransactionsModule, AuthModule ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
