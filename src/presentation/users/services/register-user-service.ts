
import { encriptAdapter, envs, JwtAdapter } from "../../../config";
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

private sendLinkValidateToken = async (email:string)=>{
  const token = await  JwtAdapter.generateToken({email}, "300s");
  if(!token) throw CustomError.internalServer('Error generating token');
 
  const link = `http://${envs.WEBSERVICE_URL}/api/users/validate/${token}`
  const html =`
  <h1> Validate Your Email! </h1>
  <p>Click the link and verify your email</p>
  <a href="${link}">Validate your email ${link}</a>
 `


  return token;
};
  
}

