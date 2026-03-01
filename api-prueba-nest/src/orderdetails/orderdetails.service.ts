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
            console.log(`producto accedido ${product.name}`);

            if(!product){
                throw new Error('No existe el producto que deseas agregar a la orden');
            }


            const detail=new OrdersDetail()
            detail.order=orders;
            detail.product=product;
            detail.quantity=item.quantity;
            detail.total=product.price*item.quantity;

            const productUpdated=await this._productService.updateProductQuantity(item.productId,item.quantity);

            if(!productUpdated){
                throw new Error('no logramos actualizar la cantidad del producto');
            }

            details.push(detail);

        }

        const saved=await this._repo.saveOrderItem(details)
        if(!saved){
            return null;
        }

        const detailsWithRelations = await Promise.all(
            saved.map(detail => 
                this._repo.getOrderDetailById(detail.id)
            )
        );

        return detailsWithRelations.map(d => 
            this.mapDetailResponse(d)
        );
    }


    private mapDetailResponse(data:OrdersDetail) : OrderDetailResponse{
        return {
            id:data.id,
            product:{
                id:data.product.id,
                name:data.product.name,
                description:data.product.description,
                price:data.product.price
            },
            quantity:data.quantity,
            total:Number(data.total)
        };
    }
    
}
