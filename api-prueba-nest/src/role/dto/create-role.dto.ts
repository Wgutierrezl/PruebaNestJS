import { IsString,
         IsNotEmpty,
 } from "class-validator";
 import { ApiProperty } from "@nestjs/swagger";

 export class CreateRoleDTO{

    @ApiProperty({description:'nombre del rol', example:'admin'})
    @IsString()
    @IsNotEmpty()
    name:string

    @ApiProperty({description:'descripcion del rol', example:'rol de administrador'})
    @IsString()
    description:string
 }