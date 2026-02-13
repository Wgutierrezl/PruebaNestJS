import { Injectable } from "@nestjs/common";
import { ITokenService } from "./interfaces/token-service.interface";
import { UserResponseDTO } from "src/users/dto/user-response.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenService implements ITokenService{

    constructor(
        private readonly jwtService:JwtService
    ){}

    generateToken(data: UserResponseDTO): Promise<string> {
        const payload={
            id:data.id,
            name:data.name,
            email:data.email,
            role:data.role.name,
            isActive:data.isActive
        }

        return this.jwtService.signAsync(payload)
    }
    
}