import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { IUserRepository } from "./interfaces/user-repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository implements IUserRepository{

    constructor(
        @InjectRepository(User)
        private readonly repo:Repository<User>
    ){}

    async deleteId(id: number): Promise<void> {
        await this.repo.delete(id)
    }

    createUser(data: User): Promise<User> {
        return this.repo.save(data)
    }
    
    getUserByEmail(email: string): Promise<User | null> {
        return this.repo.findOne({
            where:{email:email}
        });
    }

    getUserProfile(userId: number): Promise<User | null> {
        return this.repo.findOne({
            where:{
                id:userId
            }
        })
    }

    getAllUsers(): Promise<User[] | null> {
        return this.repo.find()
    }
    
}
