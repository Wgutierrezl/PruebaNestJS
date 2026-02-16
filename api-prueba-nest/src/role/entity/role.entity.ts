import { Column,
         Entity,
         PrimaryGeneratedColumn,
         ManyToOne
 } from "typeorm";


@Entity('roles')
export class Role{
    
    @PrimaryGeneratedColumn()
    id:number

    @Column({length:100, nullable:false})
    name:string

    @Column({length:200, nullable:true})
    description:string
}