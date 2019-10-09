import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Photo {

    @PrimaryGeneratedColumn()
    public id: number

    @Column({
        default: '',
    })
    public name: string

    @Column({
        default: '',
    })
    public description: string

    @Column({
        default: '',
    })
    public url: string

    @ManyToOne((type) => User, (user) => user.photos)
    public user: User

}