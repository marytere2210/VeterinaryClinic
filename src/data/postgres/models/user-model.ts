/**
 * se crea el modelo de la tabla user-model
 */

import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, Column, Entity } from "typeorm";

export enum RoleUser{
    ADMIN= "admin",
    USER= "user",
}

/**
 * Clase que define el modelo de la tabla user
 */
@Entity()
export class TypeUsers extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string;
    
    @Column({type: "varchar", length: 255})
    name: string;

    @Column({type: "varchar", length: 255})
    email: string;

    @Column({type: "varchar", length: 255, nullable: true})
    password:string;

    @Column({type: "enum",enum: RoleUser, default:"user"})
    rol: RoleUser;

    @Column({type: "boolean", default: true})
    status: boolean;

    @CreateDateColumn()
    created_at: Date;
}