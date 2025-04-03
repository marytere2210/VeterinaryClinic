import { Petpost } from "../../../data";
import { CustomError } from "../../../domain";
import { CreatePetPostDto } from "../../../domain/dtos/post-pet/create-post.dto";
import { FinderUserService } from "../../users/services/finder-user-service";

export class RegisterPetPost{

constructor(
  private readonly finderUserService: FinderUserService

){}

  async execute(petData: any, userId: string){
    const pet = new Petpost();

    const user = await this.finderUserService.execute(userId);
   
    
    pet.pet_name = petData.pet_name;
    pet.description = petData.description;
    pet.image_url = petData.image_url;
    pet.user = user!;
   
    


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


