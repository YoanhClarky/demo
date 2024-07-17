import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Arrondissement } from "./Arrondissement";

@Entity()
export class Ville extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @OneToMany(() => Arrondissement, arrondissment => arrondissment.ville)
    arrondissements: Arrondissement[];
}