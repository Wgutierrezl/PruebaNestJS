import { Products } from "../entities/product.entities";


export interface IProductRepository{
    createProduct(data:Products) : Promise<Products | null>
    getAllProducts() : Promise<Products[] | null>
    getProductsByUserId(userId:number) : Promise<Products[] | null>
    deleteProduct(id:number) : Promise<void>
}