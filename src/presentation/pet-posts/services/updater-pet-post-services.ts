import { Petpost } from "../../../data";
import { CustomError } from "../../../domain";
import { CreatePetPostDto } from "../../../domain/dtos/post-pet/create-post.dto";

export class Updatepetpostservice{
    async execute(petId:string, petData:CreatePetPostDto){
        const pet = await this.ensurepetExists(petId);
        pet.pet_name = petData.pet_name,
        pet.description = petData.description,
        pet.image_url = petData.image_url;
        try {
            await pet.save();
            return{
                message: "pet post updated successfully"
            };
        } catch (error) {
            throw CustomError.internalServer('error updating pet post')
        }
    }

    private async ensurepetExists(userId: string){
            const pet = await Petpost.findOne({
                    select:['id'],
                    where: {
                      id: userId,
                    },
                  });
            
                  if(!pet){
                    throw CustomError.notFound('Pet post not found');
                  }
                  return pet;
                  }
              
          
}