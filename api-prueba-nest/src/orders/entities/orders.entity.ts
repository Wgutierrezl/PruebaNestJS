import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Decimal128 } from "typeorm/browser";


@Entity('orders')
export class Orders{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(() => User, {eager:true})
    @JoinColumn({name:'userId'})
    user:User

    @Column({type:'decimal', precision:10, scale:2})
    total:number

    @CreateDateColumn()
    createAt:Date

}