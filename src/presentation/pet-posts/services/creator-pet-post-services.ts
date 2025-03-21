import { Petpost } from "../../../data/postgres/models/pet-post-model";
import { CreatePetPostDto } from "../../../domain/dtos/post-pet/create-post.dto";

export class CreatePetPostService {
  constructor() {}

  async execute(createPetPostDto: CreatePetPostDto): Promise<Petpost> {
    const { pet_name, description, image_url } = createPetPostDto;

    try {
      const petPost = new Petpost();
      petPost.pet_name = pet_name;
      petPost.description = description;
      petPost.image_url = image_url;

      await petPost.save();

      return petPost;
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear la publicación de la mascota");
    }
  }
}
