import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm"
import { Quartier } from "./Quartier"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column()
    age: number;

    @Column()
    quartier_id: number;

    @ManyToOne(() => Quartier, (quartier) => quartier.users, {nullable: true})
    @JoinColumn({ name: "quartier_id" })
    quartier: Quartier;
}