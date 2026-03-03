import { Inject, Injectable } from "@nestjs/common";
import { IProductRepository } from "./interfaces/product-repository.interface";
import { Products } from "./entities/product.entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProductRepository implements IProductRepository{

    constructor(
        @InjectRepository(Products)
        private readonly repo:Repository<Products>
    ){}
    async updateProduct(id: number, data: Products): Promise<Products | null> {
        await this.repo.update(id, data);
        const updated = await this.repo.findOne({
            where: { id },
            relations: {        // ← esto faltaba
                user: {
                    role: true
                }
            }
        });

    if(!updated) return null;
    return updated;
}
    
    async getProductById(id: number): Promise<Products | null> {
        return await this.repo.findOne({
            where:{
                id:id
            },
            relations:{
                user:{
                    role:true
                }
            }
        })
    }

    createProduct(data: Products): Promise<Products | null> {
        return this.repo.save(data)
    }
    
    getAllProducts(): Promise<Products[] | null> {
        return this.repo.find({
            relations:{
                user:{
                    role:true
                }
            }
        });
    }
    
    getProductsByUserId(userId: number): Promise<Products[] | null> {
        return this.repo.find({
            where:{
                user:{
                    id:userId
                }
            },
            relations:{
                user:{
                    role:true
                }
            }
        })
    }

    async deleteProduct(id: number): Promise<void> {
        await this.repo.delete(id)
        return ;
    }
    
}