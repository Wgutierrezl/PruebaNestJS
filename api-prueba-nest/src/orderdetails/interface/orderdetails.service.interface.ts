import { Orders } from "src/orders/entities/orders.entity";
import { CreateOrderDetailDTO } from "../dto/create.order.item.dto";
import { OrderDetailResponse } from "../dto/order.item.response.dto";

export interface IOrderDetailService{
    saveOrderItem(orders:Orders,data:CreateOrderDetailDTO[]) : Promise<OrderDetailResponse[] | null>;
}