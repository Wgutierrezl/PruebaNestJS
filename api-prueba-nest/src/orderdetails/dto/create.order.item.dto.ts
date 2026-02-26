import { ApiProperty } from "@nestjs/swagger";
import { IsInt,Min } from "class-validator";


export class CreateOrderDetailDTO {

  @ApiProperty({ example: 1, description: 'ID del producto' })
  @IsInt()
  productId: number;

  @ApiProperty({ example: 2, description: 'Cantidad del producto' })
  @IsInt()
  @Min(1)
  quantity: number;
}