import { Module } from '@nestjs/common';
import { OrderdetailsService } from './orderdetails.service';
import { OrderdetailsController } from './orderdetails.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersDetail } from './entities/ordersdetails.entity';
import { ORDER_DETAIL_REPOSITORY, ORDER_DETAIL_SERVICE } from './interface/ordersdetails.tokens';
import { OrderDetailRepository } from './orderdetails.repository';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports:[TypeOrmModule.forFeature([OrdersDetail]),
           ProductsModule
  ],
  controllers: [OrderdetailsController],
  providers: [
    {
      provide:ORDER_DETAIL_REPOSITORY,
      useClass:OrderDetailRepository
    },
    {
      provide:ORDER_DETAIL_SERVICE,
      useClass:OrderdetailsService
    }
  ],
  exports:[ORDER_DETAIL_REPOSITORY, ORDER_DETAIL_SERVICE]
})
export class OrderdetailsModule {}
