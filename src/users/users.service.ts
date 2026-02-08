import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from './interfaces/user-service.interface';
import type { IUserRepository } from './interfaces/user-repository.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from './dto/login-user.dto';
import { SessionDTO } from './dto/session-user.dto';
import { UserResponseDTO } from './dto/user-response.dto';
import { USER_REPOSITORY } from './interfaces/users.tokens';
import { HASHER_SERVICE, TOKEN_SERVICE } from 'src/auth/interfaces/auth.tokens';
import type { ITokenService } from 'src/auth/interfaces/token-service.interface';
import type { IHashService } from 'src/auth/interfaces/hash-service.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService implements IUserService {

    constructor(
        @Inject(USER_REPOSITORY)
        private readonly repository:IUserRepository,

        @Inject(TOKEN_SERVICE)
        private readonly token_service:ITokenService,

        @Inject(HASHER_SERVICE)
        private readonly hasher_service:IHashService
    ){}

    async registerUser(data: CreateUserDTO): Promise<UserResponseDTO | null> {
        const userEntity=new User()

        userEntity.name=data.name
        userEntity.email=data.email
        userEntity.password=await this.hasher_service.encryptPassword(data.password)

        const userCreated=await this.repository.createUser(userEntity)

        if(userCreated==null){
            return null
        }

        return this.mapUserResponse(userCreated)
    }

    async loginUser(data: LoginDTO): Promise<SessionDTO | null> {
        try{

            const userExisting = await this.repository.getUserByEmail(data.email)

            if(userExisting==null){
                return null
            }

            const comparePasswords= await this.hasher_service.comparePassword(data.password, userExisting.password)

            if(!comparePasswords){
                throw new Error('email or passwords incorrects')
            }

            const token=await this.token_service.generateToken(this.mapUserResponse(userExisting))

            if(token==null){
                throw new Error('we couldnt create the token')
            }

            return this.mapSessionResponse(userExisting, token)

        }catch(error:any){
            throw new Error(`error ${error.message}`)

        }
    
    }

    async getUserProfile(userId: number): Promise<UserResponseDTO | null> {
        const user=await this.repository.getUserProfile(userId)

        if(user==null){
            return null
        }

        return this.mapUserResponse(user)
        
    }

    async getAll(): Promise<UserResponseDTO[] | null> {
        const users=await this.repository.getAllUsers()

        if(!users || users?.length===0){
            return null
        }

        return users.map(x=> this.mapUserResponse(x))
    }
    
    async deleteUserById(id: number): Promise<void> {
        try{
            await this.repository.deleteId(id)
            return ;

        }catch(error:any){
            throw new Error(`we cant delete the user ${error.message}`)
        }
        
    }


    private mapUserResponse(data:User) : UserResponseDTO{
        return {
            id:data.id,
            name:data.name,
            email:data.email,
            isActive:data.isActive,
            dateCreated:data.dateCreated
        }
    }

    private mapSessionResponse(data:User, token:string) : SessionDTO{
        return {
            userId:data.id,
            name:data.name,
            email:data.email,
            dateCreated:data.dateCreated,
            token:token
        }
    }
}
