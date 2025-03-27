import { Petpost } from "../../../data";
import { CustomError } from "../../../domain";

export class FinderpetpostService{
    async execute(petId: string){
        const pet = Petpost.findOne({
            select:['id', 'pet_name', 'description', 'image_url','status'],
            where: {
                id: petId, 
             
            },
        });
        if(!pet){
            throw CustomError.internalServer('error fetching pet');
        }
        return pet;
        }
   
    }
