import { promises } from "dns";
import { OrdersDetail } from "../entities/ordersdetails.entity";

export interface IOrderDetailRepository{
    saveOrderItem(data:OrdersDetail[]) : Promise<OrdersDetail[]>;
    getOrderDetailById(id:number) : Promise<OrdersDetail>;
}