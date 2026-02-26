import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { Decimal128 } from "typeorm/browser";
import { OrdersDetail } from "src/orderdetails/entities/ordersdetails.entity";


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

    @OneToMany(()=> OrdersDetail , detail=> detail.order, {eager:true})
    orderDetails:OrdersDetail[]

}