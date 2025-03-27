import { Petpost } from "../../../data";
import { CustomError } from "../../../domain";

export class Deletepetpostservice{
    async execute(petId:string){
        const pet = await this.ensurePetExists(petId);
        
        try {
          await pet.save();  
          return{
            message:"pet post deleted successfully"
          }

        } catch (error) {
            throw CustomError.internalServer('error deleting pet post')   
        }
    }

    private async ensurePetExists(petId:string){
        const pet = await Petpost.findOne({
            select: ['id'],
            where: {
                id:petId
            },
        });
        if(!pet){
            throw CustomError.notFound('pet post not found');
        }
        return pet;
}
}