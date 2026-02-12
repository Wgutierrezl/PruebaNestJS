import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entities';
import { PRODUCT_REPOSITORY } from './interfaces/products.token';
import { ProductRepository } from './product.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([Products])
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,{
      provide:PRODUCT_REPOSITORY,
      useClass:ProductRepository
    }
  ],
  exports:[ProductsService]
})
export class ProductsModule {}
