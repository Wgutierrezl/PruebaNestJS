import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entities';
import { PRODUCT_REPOSITORY, PRODUCT_SERVICE } from './interfaces/products.token';
import { ProductRepository } from './product.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([Products])
  ],
  controllers: [ProductsController],
  providers: [
    {
      provide:PRODUCT_REPOSITORY,
      useClass:ProductRepository
    },
    {
      provide:PRODUCT_SERVICE,
      useClass:ProductsService
    }
  ],
  exports:[PRODUCT_SERVICE, PRODUCT_REPOSITORY]
})
export class ProductsModule {}
