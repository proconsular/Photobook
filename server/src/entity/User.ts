import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Photo } from './Photo'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public username: string

    @Column()
    public password: string

    @Column({
        default: '',
    })
    public token: string

    @Column({
        default: false,
    })
    public online: boolean

    @OneToMany((type) => Photo, (photo) => photo.user)
    public photos: Photo[]

}