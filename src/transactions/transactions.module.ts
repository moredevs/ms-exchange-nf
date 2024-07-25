import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { TransactionsController } from './controllers/transactions.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moneda } from './model/moneda.entity';
import { TipoCambio } from './model/tipo-cambio.entity';
import { Transaccion } from './model/transaccion.entity';
import { TRANSACTION_SERVICE } from './services/transactions.interface.service';
import { PassportModule } from '@nestjs/passport';
 import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [{
    useClass: TransactionsService,
    provide: TRANSACTION_SERVICE
  },{
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor
  }],
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }),AuthModule,
    TypeOrmModule.forFeature([Moneda, TipoCambio, Transaccion])

  ],
  controllers: [TransactionsController]
})
export class TransactionsModule {}
 
