export class UpdatePetDto {
    constructor(
        public pet_name: string,
        public description: string,
        public image_url?: string
    ) {}

    static execute(object: { [key: string]: any }): [string?, UpdatePetDto?] {
        const { pet_name, description, image_url } = object;

        if (pet_name === pet_name) return ["Name is the same"];    
        if (!description) return ["Description is required"];
        return [undefined, new UpdatePetDto(pet_name, description, image_url)];
    }
}