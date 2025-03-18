export class CreatePostDto {
    constructor(
        public pet_name: string,
        public description: string,
        public image_url?: string
    ) {}

    static execute(object: { [key: string]: any }): [string?, CreatePostDto?] {
        const { pet_name, description, image_url } = object;

        if (!pet_name) return ["Pet name is required"];
        const petRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (petRegex.test(pet_name)) return ["nombre is invalid"];
        if (!description) return ["Description is required"];
        if(!image_url) return ["Image is required"];
        
        return [undefined, new CreatePostDto(pet_name, description, image_url)];
    }
}