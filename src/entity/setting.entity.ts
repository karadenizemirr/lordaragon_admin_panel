import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Setting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    title: string

    @Column({nullable: true})
    description: string 

    @Column({nullable: true})
    author: string

    @Column({nullable: true})
    address: string

    @Column({nullable: true})
    phoneNumber: string

    @Column({nullable: true})
    mailAddress: string

    @Column({nullable: true})
    facebook: string

    @Column({nullable: true})
    instagram: string

    @Column({nullable: true})
    twitter: string

    @Column({nullable: true})
    youtube: string

    @Column({nullable: true})
    headerText: string

    @Column({nullable: true})
    primaryColor: string

    @Column({nullable: true})
    logo: string

    @Column({nullable: true})
    headerImage: string
}