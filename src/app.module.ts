import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';

@Module({
  imports:[
    TypeOrmModule.forRoot({
      type:'sqlite',
      database:'database.sqlite',
      autoLoadEntities: true,
      synchronize: true
    }),
    AuthModule,
    UsersModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
