import { User } from "src/users/entities/user.entity";
import { Column,
        Entity,
        PrimaryGeneratedColumn,
        CreateDateColumn,
        ManyToOne,
        JoinColumn
 } from "typeorm";   



 @Entity('products')
 export class Products{
    @PrimaryGeneratedColumn()
    id:number

    @Column({length:100, nullable:false})
    name:string

    @Column({length:200, nullable:true})
    description:string

    @Column()
    quantity:number

    @CreateDateColumn()
    createAt: Date

    @Column({default:true})
    isActive:boolean

    @ManyToOne(() => User, user => user.product, {eager:false})
    @JoinColumn({name:'userId'})
    user:User

 }