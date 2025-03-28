import { encriptAdapter } from "../../../config";
import { TypeUsers } from "../../../data";
import { CustomError, RegisterUserDto } from "../../../domain";


export class RegisterUsersService{
  async execute(userData: RegisterUserDto){
    const user = new TypeUsers();
      
      user.name = userData.name;
      user.email = userData.email;
      user.password = this.encriptPassword(userData.password);
      

    try {
      await user.save();
      return {
        message: 'User created successfully'
      }

      
    } catch (error) {
      throw CustomError.internalServer('error creating user')
    }
  }

 private encriptPassword(password: string): string {
  return encriptAdapter.hash(password);
 }
}