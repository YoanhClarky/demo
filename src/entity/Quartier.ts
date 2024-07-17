import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Arrondissement } from "./Arrondissement";

@Entity()
export class Quartier extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @OneToMany(() => User, user => user.quartier)
    users: User[];

    @Column()
    arrondissement_id: number;

    @ManyToOne(() => Arrondissement, (arrondissement) => arrondissement.quartiers, { nullable: true })
    @JoinColumn({ name: "arrondissement_id" })
    arrondissement: Arrondissement;
}