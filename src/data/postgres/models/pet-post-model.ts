/**
 * se crea el modelo de la tabla pet_post
 */

import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, Column, Entity } from "typeorm";

export enum PetPostStatus{
    PENDING= "pending",
    APPROVED= "approved",
    REJECTED= "rejected",
}

/**
 * Clase que define el modelo de la tabla pet_post
 */
@Entity()
export class Petpost extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string;
    
    @Column({type: "varchar", length: 255})
    pet_name: string;

    @Column({type: "text"})
    description: string;

    @Column({type: "varchar", length: 255, nullable: true})
    image_url:string;

    @Column({type: "enum",enum: PetPostStatus, default:"pending"})
    status: PetPostStatus;

    @Column({type: "boolean", default: false})
    hasFound: boolean;

    @CreateDateColumn()
    created_at: Date;
}