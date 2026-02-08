import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { IHashService } from './interfaces/hash-service.interface';

@Injectable()
export class HashService implements IHashService{

    private readonly SALT_ROUNDS=10;

    async encryptPassword(data: string): Promise<string> {
        return bcrypt.hash(data, this.SALT_ROUNDS)
    }
    async comparePassword(password: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(password, hashed);
    }
    
}