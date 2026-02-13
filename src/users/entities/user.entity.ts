import { Products } from "src/products/entities/product.entities";
import { Role } from "src/role/entity/role.entity";
import { Entity,
        Column,
        PrimaryGeneratedColumn,
        CreateDateColumn,
        OneToMany,
        ManyToOne,
        JoinColumn
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

    @ManyToOne(() => Role, {eager:true})
    @JoinColumn({name:'role_id'})
    role:Role
 }