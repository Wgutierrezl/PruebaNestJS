import { CreateOrderDetailDTO } from "src/orderdetails/dto/create.order.item.dto";
import { IsArray, ValidateNested,ArrayMinSize, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDTO{
    @ApiProperty({
        description: 'Lista de productos que se agregarán a la orden',
        type: () => CreateOrderDetailDTO,
        isArray: true,
        example: [
            {
                productId: 1,
                quantity: 2
            },
            {
                productId: 3,
                quantity: 1
            }
        ]
    })
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each:true})
    @Type(() => CreateOrderDetailDTO)
    item:CreateOrderDetailDTO[]
}