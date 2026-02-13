import { Role } from "../entity/role.entity";

export interface IRoleRepository{
    createRole(role:Role):Promise<Role>
    findAllRoles():Promise<Role[]>
    findRoleById(id:number):Promise<Role | null>
    deleteRole(id:number):Promise<void>
}