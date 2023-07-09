import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Blog {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({length: 255})
    description: string

    @Column({type: 'text'})
    content: string

    @Column()
    image: string
}