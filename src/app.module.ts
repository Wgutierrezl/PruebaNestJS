import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { ProductsModule } from './products/products.module';

@Module({
  imports:[
    TypeOrmModule.forRoot({
      type:'sqlite',
      database:'database.sqlite',
      autoLoadEntities: true,
      synchronize: true
    }),
    AuthModule,
    UsersModule,
    ProductsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
