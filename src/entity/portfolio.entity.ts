import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Portfolio {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    image: string
}