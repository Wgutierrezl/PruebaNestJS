import { OrderResponseDTO } from "src/orders/dto/order.response.dto"
import { ProductItemResponse, ProductResponseDTO } from "src/products/dto/product-response.dto"

export class OrderDetailResponse{
    id:number
    product:ProductItemResponse;
    quantity:number;
    total:number;
}