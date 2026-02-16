import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { ROLE_REPOSITORY, ROLE_SERVICE } from './interface/roles.tokens';
import { RoleRepository } from './role.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([Role])
  ],
  controllers: [RoleController],
  providers: [
    {
      provide: ROLE_SERVICE,
      useClass: RoleService
    },
    {
      provide: ROLE_REPOSITORY,
      useClass: RoleRepository
    }
  ],
  exports:[ROLE_SERVICE,ROLE_REPOSITORY]
})
export class RoleModule {}
