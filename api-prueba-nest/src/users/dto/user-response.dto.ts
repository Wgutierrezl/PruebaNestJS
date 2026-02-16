import { RoleResponseDTO } from "src/role/dto/role-response.dto"

export class UserResponseDTO{
    id:number
    name:string
    email:string
    role:RoleResponseDTO
    isActive:boolean
    dateCreated:Date
 }