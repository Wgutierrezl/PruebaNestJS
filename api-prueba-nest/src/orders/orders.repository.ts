import { Injectable } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { IOrderRepository } from "./interface/orders.repository.interface";
import { Orders } from "./entities/orders.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class OrderRepository implements IOrderRepository{
    constructor(
        @InjectRepository(Orders)
        private readonly _context:Repository<Orders>
    ){

    }
    async saveOrder(data: Orders): Promise<Orders> {
        return await this._context.save(data);
    }
    async getOrderById(id: number): Promise<Orders | null> {
        return await this._context.findOne({
            where:{
                id:id
            },
            relations:{
                user:true,
                orderDetails:true
            }
        });
    }
    async getOrdersByUserId(userId: number): Promise<Orders[]> {
        return await this._context.find({
            where:{
                user:{
                    id:userId
                }
            },
            relations:{
                user:true,
                orderDetails:true
            }
        })
    }
    
}