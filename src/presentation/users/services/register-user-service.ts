import { TypeUsers } from "../../../data/postgres/models/user-model";
import { RegisterUserDto } from "../../../domain/dtos/users/create-user-post.dto";

export class RegisterUsers {
  constructor() {}

  async execute(registerUserDto: RegisterUserDto): Promise<TypeUsers> {
    const { name, email, password } = registerUserDto;

    try {
      const user = new TypeUsers();
      user.name = name;
      user.email = email;
      user.password = password; // Consider hashing the password here

      await user.save();

      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear el usuario");
    }
  }
}
