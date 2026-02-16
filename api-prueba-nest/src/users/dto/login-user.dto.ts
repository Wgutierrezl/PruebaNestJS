import { IsEmail,
        IsString,
        IsNotEmpty,
        MinLength
 } from "class-validator";  
 import { ApiProperty } from "@nestjs/swagger";

 export class LoginDTO{
    @ApiProperty({example: 'juanperez@gmail.com'})
    @IsEmail()
    email:string

    @ApiProperty({example:'elbichomario'})
    @IsString()
    @MinLength(6)
    password:string
 }