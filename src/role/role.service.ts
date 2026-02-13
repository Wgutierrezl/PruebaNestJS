import { Inject, Injectable } from '@nestjs/common';
import { IRoleService } from './interface/role-service.interface';
import { CreateRoleDTO } from './dto/create-role.dto';
import { RoleResponseDTO } from './dto/role-response.dto';
import { ROLE_REPOSITORY } from './interface/roles.tokens';
import type { IRoleRepository } from './interface/role-repository.interface';
import { Role } from './entity/role.entity';

@Injectable()
export class RoleService implements IRoleService {

    constructor(
        @Inject(ROLE_REPOSITORY)
        private readonly repo:IRoleRepository,
    ){
        

    }
    async createRole(createRoleDTO: CreateRoleDTO): Promise<RoleResponseDTO | null> {
        const role=new Role()

        role.name=createRoleDTO.name
        role.description=createRoleDTO.description ? createRoleDTO.description : ''

        const createdRole=await this.repo.createRole(role)

        if(createdRole==null){
            return null
        }

        return this.mapRoleResponse(createdRole)
    }

    async getAllRoles(): Promise<RoleResponseDTO[] | null> {
        const roles=await this.repo.findAllRoles()
        if(roles==null || roles.length==0){
            return null
        }

        return roles.map(role=>this.mapRoleResponse(role))
    }

    async getRoleById(id: number): Promise<RoleResponseDTO | null> {
        const role=await this.repo.findRoleById(id)
        if(role==null){
            return null
        }

        return this.mapRoleResponse(role)
    }
    
    async deleteRole(id: number): Promise<boolean> {
        const role=await this.repo.findRoleById(id)
        if(role==null){
            return false
        }
        await this.repo.deleteRole(id)
        return true
    }

    private mapRoleResponse(roleEntity:Role): RoleResponseDTO{
        return {
            id:roleEntity.id,
            name:roleEntity.name,
            description:roleEntity.description
        }
    }
}

