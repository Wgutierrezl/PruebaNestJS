import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';
import { HashService } from './hash.service';
import { HASHER_SERVICE, TOKEN_SERVICE } from './interfaces/auth.tokens';

@Module({
    imports:[
        JwtModule.register({
            secret:process.env.JWT_SECRET || 'super_secret_key',
            signOptions:{
                expiresIn: '1h'
            },
        }),
    ],
    providers:[
        {
            provide: TOKEN_SERVICE,
            useClass: TokenService
        }, 
        {
            provide: HASHER_SERVICE,
            useClass: HashService
        },       
    ],
    exports:[TOKEN_SERVICE, HASHER_SERVICE]
})
export class AuthModule {}
