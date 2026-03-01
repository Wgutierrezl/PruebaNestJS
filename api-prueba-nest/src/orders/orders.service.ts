import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IOrdersService } from './interface/orders.service.interface';
import { OrderResponseDTO } from './dto/order.response.dto';
import { CreateOrderDTO } from './dto/orderCreate.dto';
import { ORDERS_REPOSITORY } from './interface/orders.token';
import type { IOrderRepository } from './interface/orders.repository.interface';
import { ORDER_DETAIL_SERVICE } from 'src/orderdetails/interface/ordersdetails.tokens';
import type { IOrderDetailService } from 'src/orderdetails/interface/orderdetails.service.interface';
import { Orders } from './entities/orders.entity';
import { OrderDetailResponse } from 'src/orderdetails/dto/order.item.response.dto';

@Injectable()
export class OrdersService implements IOrdersService {
    constructor(
        @Inject(ORDERS_REPOSITORY)
        private readonly _repo:IOrderRepository,

        @Inject(ORDER_DETAIL_SERVICE)
        private readonly _detailService:IOrderDetailService
    ){

    }

    async createOrder(data: CreateOrderDTO, userId: number): Promise<OrderResponseDTO> {
        const order=new Orders();
        order.user={id:userId} as any;
        order.total=0; //POR EL MOMENTO, DESPUES SE QUITAN LOS DATOS QUEMADOS

        const orderSaved=await this._repo.saveOrder(order)
        if(!orderSaved){
            throw new Error('no hemos logrado crear la orden');
        }

        const orderDetailsSaved=await this._detailService.saveOrderItem(orderSaved, data.item);
        if(!orderDetailsSaved){
            throw new Error('no hemos logrado guardar los detalles de las ordenes');
        }

        const orderResponse=await this._repo.getOrderById(orderSaved.id)
        if(!orderResponse){
            throw new Error('no hemos logrado acceder a el detalle de la orden');
        }

        return this.mapOrderResponse(orderResponse);

    }
    async getOrderById(id: number): Promise<OrderResponseDTO> {
        const order=await this._repo.getOrderById(id)
        if(!order){
            throw new NotFoundException('La orden no existe');
        }

        return this.mapOrderResponse(order);

    }
    async getOrderByUserId(userId: number): Promise<OrderResponseDTO[]> {
        const orders=await this._repo.getOrdersByUserId(userId)

        if(!orders || orders.length===0){
            throw new NotFoundException('El usuario aun no ha realizado ordenes');
        }

        return orders.map(l=> this.mapOrderResponse(l));
    }

    private mapOrderResponse(data:Orders) : OrderResponseDTO{
        return {
            id:data.id,
            user:{
                id:data.user.id,
                name:data.user.name,
                    email:data.user.email,
                    role:{
                        id:data.user.role.id,
                        name:data.user.role.name,
                        description:data.user.role.description
                    },
                    isActive:data.user.isActive,
                    dateCreated:data.user.dateCreated
            },
            orderDetails:data.orderDetails.map(detail=> ({
                id:detail.id,
                product:detail.product,
                quantity:detail.quantity,
                total:detail.total
            })),
            createAt:data.createAt
        }
    }
}
