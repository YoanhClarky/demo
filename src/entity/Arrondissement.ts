import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Quartier } from "./Quartier";
import { Ville } from "./Ville";

@Entity("arrondissement")
export class Arrondissement extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    nom: string;

    @Column()
    ville_id: number

    @OneToMany(() => Quartier,(quartier) => quartier.arrondissement)
    quartiers: Quartier[];

    @ManyToOne(() => Ville, (ville) => ville.arrondissements, {nullable: true})
    @JoinColumn({ name: "ville_id" })
    ville: Ville;
}