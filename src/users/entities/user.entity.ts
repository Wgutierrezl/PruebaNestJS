import { Products } from "src/products/entities/product.entities";
import { Entity,
        Column,
        PrimaryGeneratedColumn,
        CreateDateColumn,
        OneToMany,
 } from "typeorm";

 @Entity('user')
 export class User{

    @PrimaryGeneratedColumn()
    id:number

    @Column({length:150})
    name: string

    @Column({length: 150, nullable:false, unique:true})
    email: string

    @Column({length:100, nullable:false})
    password:string

    @CreateDateColumn()
    dateCreated:Date

    @Column({default:true})
    isActive: boolean

    @OneToMany(() => Products, products=> products.user)
    product:Products[]
 }