import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IOrderDetailRepository } from "./interface/orderdetails.repository.interface";
import { OrdersDetail } from "./entities/ordersdetails.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderDetailRepository implements IOrderDetailRepository{

    constructor(
        @InjectRepository(OrdersDetail)
        private readonly _context:Repository<OrdersDetail>

    ){}
    async getOrderDetailById(id: number): Promise<OrdersDetail> {
        const orderDetails= await this._context.findOne({
            where:{
                id:id
            },
            relations:{
                product:true
            }
        })
        
        if(!orderDetails){
            throw new Error('No existe el detalle de la orden que deseas buscas');
        }

        return orderDetails;
    }

    async saveOrderItem(data: OrdersDetail[]): Promise<OrdersDetail[]> {
        return await this._context.save(data);
    }
    
}