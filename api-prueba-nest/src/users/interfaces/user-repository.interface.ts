import { UserResponseDTO } from "../dto/user-response.dto";
import { User } from "../entities/user.entity";

export interface IUserRepository{
    createUser(data:User): Promise<User>
    getUserByEmail(email:string) : Promise<User | null>
    getUserProfile(userId:number) : Promise<User | null>
    getAllUsers() : Promise<User[] | null> 
    deleteId(id:number) : Promise<void>
}