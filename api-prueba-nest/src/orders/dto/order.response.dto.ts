import { OrderDetailResponse } from "src/orderdetails/dto/order.item.response.dto";
import { UserResponseDTO } from "src/users/dto/user-response.dto";

export class OrderResponseDTO{
    id:number;
    user:UserResponseDTO;
    orderDetails:OrderDetailResponse[];
    createAt:Date
}