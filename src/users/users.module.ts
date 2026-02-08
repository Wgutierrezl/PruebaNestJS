import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { USER_REPOSITORY } from './interfaces/users.tokens';
import { UserRepository } from './users.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [
    UsersService,{
      provide:USER_REPOSITORY,
      useClass:UserRepository
    }
  ],
  exports:[UsersService]
})
export class UsersModule {}
