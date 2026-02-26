import { CreateOrderDetailDTO } from "src/orderdetails/dto/create.order.item.dto";
import { IsArray, ValidateNested,ArrayMinSize, IsInt } from "class-validator";
import { Type } from "class-transformer";

export class CreateOrderDTO{
    
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each:true})
    @Type(() => CreateOrderDetailDTO)
    item:CreateOrderDetailDTO[]
}