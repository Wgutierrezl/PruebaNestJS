import { CreateProductDTO } from "../dto/product-create.dto";
import { ProductResponseDTO } from "../dto/product-response.dto";
import { Products } from "../entities/product.entities";

export interface IProductService{
    createProduct(data:CreateProductDTO, userId:number) : Promise<ProductResponseDTO | null>
    getAllProducts() : Promise<ProductResponseDTO[] | null>
    getProductById(id:number) : Promise<ProductResponseDTO | null>
    getProductEntityById(id:number) : Promise<Products>
    getProductsByUserId(userId:number) : Promise<ProductResponseDTO[] | null>
    deleteProductById(id:number)
}