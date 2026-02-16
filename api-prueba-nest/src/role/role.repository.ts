import { Inject, Injectable } from "@nestjs/common";
import { IRoleRepository } from "./interface/role-repository.interface";
import { In, Repository } from "typeorm";
import { Role } from "./entity/role.entity";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class RoleRepository implements IRoleRepository{

    constructor(
        @InjectRepository(Role)
        private readonly repo: Repository<Role>
    ){

    }
    async createRole(role: Role): Promise<Role> {
        return await this.repo.save(role);
    }
    async findAllRoles(): Promise<Role[]> {
        return await this.repo.find();
    }
    async findRoleById(id: number): Promise<Role | null> {
        return await this.repo.findOneBy({id});
    }
    async deleteRole(id: number): Promise<void> {
        await this.repo.delete(id);
    }
    
}