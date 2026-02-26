import { IsInt,Min } from "class-validator";


export class CreateOrderDetailDTO{
    @IsInt()
    productId:number

    @IsInt()
    @Min(1)
    quantity:number
}