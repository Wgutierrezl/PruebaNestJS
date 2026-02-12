import { ApiProperty } from "@nestjs/swagger";
import { 
    IsString,
    IsNotEmpty,
    MinLength,
    IsNumber
 } from "class-validator";  
 import { UserResponseDTO } from "src/users/dto/user-response.dto";

export class ProductResponseDTO{
    id:number
    name:string
    description:string
    quantity:number
    user:UserResponseDTO
    createAt:Date
    isActive:boolean
}
