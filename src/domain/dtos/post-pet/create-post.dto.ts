export class CreatePetPostDto {
    constructor(
      public readonly pet_name: string,
      public readonly description: string,
      public readonly image_url: string
    ) {}
  
    static execute(object: { [key: string]: any }): [string?, CreatePetPostDto?] {
      const { pet_name, description, image_url } = object;
  
      if (!pet_name) return ["Falta el nombre de la mascota"];
      if (!description) return ["Falta la descripción"];
      if (!image_url) return ["Falta la url de la imagen"];
  
      return [undefined, new CreatePetPostDto(pet_name, description, image_url)];
    }
  }
  