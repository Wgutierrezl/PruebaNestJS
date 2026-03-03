import { OrderResponseDTO } from "../dto/order.response.dto";
import { CreateOrderDTO } from "../dto/orderCreate.dto";

export interface IOrdersService{
    createOrder(data:CreateOrderDTO, userId:number) : Promise<OrderResponseDTO>
    getOrderById(id:number) : Promise<OrderResponseDTO>;
    getOrderByUserId(userId:number) : Promise<OrderResponseDTO[]>
}