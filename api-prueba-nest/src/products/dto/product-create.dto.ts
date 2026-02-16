import { ApiProperty } from "@nestjs/swagger";
import { 
    IsString,
    IsNotEmpty,
    MinLength,
    IsNumber
 } from "class-validator";  

export class CreateProductDTO{

    @ApiProperty({example:'Jabon liquido'})
    @IsString()
    @IsNotEmpty()
    name:string

    @ApiProperty({example:'Jabon para el chimbo'})
    @IsString()
    @IsNotEmpty()
    description:string

    @ApiProperty({example:'5'})
    @IsNumber()
    @IsNotEmpty()
    quantity:number
}
