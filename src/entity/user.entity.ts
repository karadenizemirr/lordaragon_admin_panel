import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    name: string;   

    @Column({
        unique: true
    })
    surname: string;

    @Column({
        unique: true
    })
    username: string;

    @Column({
        unique: true
    })
    password: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        unique: true
    })
    phoneNumber: string
}