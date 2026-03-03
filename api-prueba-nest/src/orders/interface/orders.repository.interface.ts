import { Orders } from "../entities/orders.entity";

export interface IOrderRepository{
    saveOrder(data:Orders) : Promise<Orders |null>;
    getOrderById(id:number) : Promise<Orders | null>;
    getOrdersByUserId(userId:number) : Promise<Orders[] | null>;
}