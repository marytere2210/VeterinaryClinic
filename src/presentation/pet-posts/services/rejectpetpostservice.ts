import { Petpost, PetPostStatus } from "../../../data";
import { CustomError } from "../../../domain";

export class Rejectpetpostservice{
  async execute(petId: string){
    const petPost = await this.findOnePetPostPending(petId);

    petPost.status = PetPostStatus.REJECTED;
try {
  await petPost.save();
  return {
    message: 'Pet post rejected  successfully',
  }
} catch (error) {
  throw CustomError.internalServer('error rejecting pet post')
  
}
  }
  private async findOnePetPostPending(petId: string) {
    const pet = await Petpost.findOne({
      where: {
        id: petId,
        status: PetPostStatus.PENDING
      },
    });

    if (!pet) {
      throw CustomError.notFound('Pet post not found');
    }
    return pet;
  }
  }

