export interface IHashService{
    encryptPassword(data:string): Promise<string>
    comparePassword(password:string, hashed:string): Promise<boolean>
}