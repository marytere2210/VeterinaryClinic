import { Petpost } from "../../../data";
import { CustomError } from "../../../domain";
import { CreatePetPostDto } from "../../../domain/dtos/post-pet/create-post.dto";

export class RegisterPetPost{
  async execute(petData: any){
    const pet = new Petpost();
    
    pet.pet_name = petData.pet_name;
    pet.description = petData.description;
    pet.image_url = petData.image_url;

    try {
      await pet.save();
      return {
        message: 'Pet created successfully'
      };
    } catch (error) {
      throw CustomError.internalServer('error creating pet');
    }
  }
}


