import { CreateRoleDTO } from "../dto/create-role.dto";
import { RoleResponseDTO } from "../dto/role-response.dto";

export interface IRoleService{
    createRole(createRoleDTO:CreateRoleDTO):Promise<RoleResponseDTO | null>
    getAllRoles():Promise<RoleResponseDTO[] | null>
    getRoleById(id:number):Promise<RoleResponseDTO | null>
    deleteRole(id:number):Promise<boolean>
}