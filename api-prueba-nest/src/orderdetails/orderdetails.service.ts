import { Inject, Injectable } from '@nestjs/common';
import { IOrderDetailService } from './interface/orderdetails.service.interface';
import { CreateOrderDetailDTO } from './dto/create.order.item.dto';
import { OrderDetailResponse } from './dto/order.item.response.dto';
import { ORDER_DETAIL_REPOSITORY } from './interface/ordersdetails.tokens';
import type { IOrderDetailRepository } from './interface/orderdetails.repository.interface';
import { OrdersDetail } from './entities/ordersdetails.entity';
import { Orders } from 'src/orders/entities/orders.entity';
import { PRODUCT_SERVICE } from 'src/products/interfaces/products.token';
import type { IProductService } from 'src/products/interfaces/product-service.interface';

@Injectable()
export class OrderdetailsService implements IOrderDetailService{

    constructor(
        @Inject(ORDER_DETAIL_REPOSITORY)
        private readonly _repo:IOrderDetailRepository,

        @Inject(PRODUCT_SERVICE)
        private readonly _productService:IProductService
    ){

    }
    async saveOrderItem(orders:Orders,data: CreateOrderDetailDTO[]): Promise<OrderDetailResponse[] | null> {
        const details:OrdersDetail[ ] =[];

        for(const item of data){
            const product=await this._productService.getProductEntityById(item.productId)

            const detail=new OrdersDetail()
            detail.order=orders;
            detail.product=product;
            detail.quantity=item.quantity;
            detail.total=5*detail.quantity

            details.push(detail);

        }

        const saved=await this._repo.saveOrderItem(details)
        if(!saved){
            return null;
        }

        return saved.map(map=> this.mapDetailResponse(map));
    }


    private mapDetailResponse(data:OrdersDetail) : OrderDetailResponse{
        return {
            id:data.id,
            product:{
                id:data.product.id,
                name:data.product.name,
                description:data.product.description
            },
            quantity:data.quantity,
            total:Number(data.total)
        };
    }
    
}
