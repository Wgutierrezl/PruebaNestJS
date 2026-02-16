import { UserResponseDTO } from "src/users/dto/user-response.dto";

export interface ITokenService{
    generateToken(data:UserResponseDTO) : Promise<string>
}