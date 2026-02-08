import { IsEmail,
        IsNotEmpty,
        IsString,
        MinLength,
        MaxLength,
 } from "class-validator";  
 import { ApiOperation, ApiProperty } from "@nestjs/swagger";

 export class CreateUserDTO{
    
    @ApiProperty({example:'juan perez'})
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    name:string

    @ApiProperty({example: 'juan@gmail.com'})
    @IsEmail()
    @IsNotEmpty()
    email:string

    @ApiProperty({ example : 'elbichomiobaby2024//'})
    @IsString()
    @MinLength(6)
    password:string

 }