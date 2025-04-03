/**import { Petpost } from "../../../data";
import { CustomError } from "../../../domain";

export class FinderpetspostService{
    async execute(){
        try {
            return Petpost.find({
                select:['id', 'pet_name', 'description', 'image_url','status']
            })
        } catch (error) {
            throw CustomError.internalServer('error fetching pet');
            
        }
    }
}*/

import { Petpost, PetPostStatus } from "../../../data"

export class FinderpetspostService{
   async execute(){

    const petpost = await Petpost.find({
        relations: { user: true },
        where: { status: PetPostStatus.APPROVED },
       select: {
           user: {
               id: true,
               name: true,
               email: true,
           }
           
        },
        
    });
        return petpost;
   }
}