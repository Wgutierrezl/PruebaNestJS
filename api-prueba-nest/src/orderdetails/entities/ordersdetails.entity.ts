import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { Orders } from "src/orders/entities/orders.entity";
import { Products } from "src/products/entities/product.entities";

@Entity('orders_detail')
export class OrdersDetail{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(()=> Orders, {eager:true})
    @JoinColumn({name:'orderId'})
    order:Orders

    @ManyToOne(() => Products,{eager:true})
    @JoinColumn({name:'productId'})
    product:Products

    @Column()
    quantity:number;

    @Column({type:'decimal', precision:10, scale:2})
    total:number

    @CreateDateColumn()
    createAt:Date

}