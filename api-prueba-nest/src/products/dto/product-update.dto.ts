import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty,
    IsNumber, IsString
 } from "class-validator";


 export class UpdatProductDTO{
    @ApiProperty({example:'Baero'})
    @IsString()
    @IsNotEmpty()
    name:string

    @ApiProperty({example:'Baerto to smoke'})
    @IsString()
    @IsNotEmpty()
    description:string

    @ApiProperty({example:5})
    @IsNumber()
    quantity:number

    @ApiProperty({example:12.95})
    @IsNumber()
    price:number
 }