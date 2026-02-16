import { CreateUserDTO} from "../dto/create-user.dto";  
import { LoginDTO } from "../dto/login-user.dto";
import { SessionDTO } from "../dto/session-user.dto";
import { UserResponseDTO } from "../dto/user-response.dto"; 

export interface IUserService{
    registerUser(data:CreateUserDTO) : Promise<UserResponseDTO | null>
    loginUser(data: LoginDTO) : Promise<SessionDTO | null>
    getUserProfile(userId:number) : Promise<UserResponseDTO | null>
    getAll() : Promise<UserResponseDTO[] | null>
    deleteUserById(id:number) : Promise<void>
}