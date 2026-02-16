import { IsEmail,
        IsNotEmpty,
        IsString,
        MinLength,
        MaxLength,
 } from "class-validator";  

 export class UpdateUserDTO{
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    name:string

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @MinLength(6)
    password:string
    
 }