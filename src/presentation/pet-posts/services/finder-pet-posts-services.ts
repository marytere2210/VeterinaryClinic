import { Petpost } from "../../../data";
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
}