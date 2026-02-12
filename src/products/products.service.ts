import { Inject, Injectable } from '@nestjs/common';
import { IProductService } from './interfaces/product-service.interface';
import { CreateProductDTO } from './dto/product-create.dto';
import { ProductResponseDTO } from './dto/product-response.dto';
import { PRODUCT_REPOSITORY } from './interfaces/products.token';
import type { IProductRepository } from './interfaces/product-repository.interface';
import { Products } from './entities/product.entities';

@Injectable()
export class ProductsService implements IProductService{

    constructor(
        @Inject(PRODUCT_REPOSITORY)
        private readonly repo:IProductRepository
    ){

    }

    async createProduct(data: CreateProductDTO, userId: number): Promise<ProductResponseDTO | null> {
        const product=new Products()

        product.name=data.name
        product.description=data.description
        product.quantity=data.quantity
        product.user={id:userId} as any

        const productCreated=await this.repo.createProduct(product)

        if(!productCreated){
            return null
        }

        return this.mapProduct(productCreated)
    }

    async getAllProducts(): Promise<ProductResponseDTO[] | null> {
        const products=await this.repo.getAllProducts()
        console.log(products)

        if(!products || products.length===0){
            return null
        }

        return products.map(map=> this.mapProduct(map))
    }

    async getProductById(id: number): Promise<ProductResponseDTO | null> {
        const product=await this.repo.getProductById(id)

        if(!product){
            return null
        }

        return product
    }

    async getProductsByUserId(userId: number): Promise<ProductResponseDTO[] | null> {
        const products=await this.repo.getProductsByUserId(userId)

        if(!products || products.length===0){
            return null
        }

        return products.map(x=> this.mapProduct(x))
    }

    async deleteProductById(id: number) {
        const product=await this.repo.getProductById(id)

        if(!product){
            return null
        }

        await this.repo.deleteProduct(id)
    }

    private mapProduct(data:Products) : ProductResponseDTO{
        return {
            id:data.id,
            name:data.name,
            description:data.description,
            quantity:data.quantity,
            user:data.user,
            createAt:data.createAt,
            isActive:data.isActive            
        }
    }
}
