import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/orders.entity';
import { ORDERS_REPOSITORY, ORDERS_SERVICE } from './interface/orders.token';
import { OrderRepository } from './orders.repository';
import { OrderdetailsModule } from 'src/orderdetails/orderdetails.module';

@Module({
  imports:[TypeOrmModule.forFeature([Orders]),
          OrderdetailsModule

  ],
  controllers: [OrdersController],
  providers: [
    {
      provide:ORDERS_REPOSITORY,
      useClass:OrderRepository
    },
    {
      provide:ORDERS_SERVICE,
      useClass:OrdersService
    }
  ],
  exports:[ORDERS_REPOSITORY, ORDERS_SERVICE]
})
export class OrdersModule {}
