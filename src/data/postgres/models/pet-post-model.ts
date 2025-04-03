import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, Column, Entity, OneToMany, ManyToOne } from "typeorm";
import { TypeUsers } from "./user-model";

export enum PetPostStatus{
    PENDING= "pending",
    APPROVED= "approved",
    REJECTED= "rejected",
}

@Entity()
export class Petpost extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    id:string;
    
    @Column("varchar",{length: 255,nullable:false})
    pet_name: string;

    @Column({type: "text"})
    description: string;

    @Column({type: "varchar", length: 255, nullable: true})
    image_url:string;

    @Column({type: "enum",enum: PetPostStatus, default: PetPostStatus.PENDING,})
    status: PetPostStatus;

    @Column({type: "boolean", default: false, nullable: false})
    hasFound: boolean;

    @CreateDateColumn()
    created_at: Date;

   @ManyToOne(()=>TypeUsers,user=>(user).pet)
   user:TypeUsers;


}