import { TypeUsers } from "../../../data";
import { CustomError } from "../../../domain";
import { LoginUserdto } from "../../../domain/dtos/users/loginUserdto";
import { encriptAdapter, JwtAdapter } from "../../../config";
import { envs } from "../../../config";

export class LoginUsersService{
    async execute(credential: LoginUserdto){
      
      //1 
      const user = await this.verifyUserExistence(credential.email);

      //2
      this.verifyPasswordIsCorrect(credential.password,user!.password);

      //3
      const token = this.generateToken({id: user!.id}, envs.EXPIREINJWT);
 
 //4 devolver token
      return {token, user:{
  id:user?.id,
  name:user?.name,
  email:user?.email,
  status:user?.status,
  } 
 }
}
//1 verificar que el usuario existe
    private verifyUserExistence(email: string){

  const user = TypeUsers.findOne({
    where: {
      email: email,
      status: true,
    },
  });

  if(!user){
    throw CustomError.notFound('User not found');
  }
  return user;
  }

// 2 verifica que la contraseña sea correcta
  private verifyPasswordIsCorrect(unencrypted: string,encrypted: string){
    const isCorrect = encriptAdapter.compare(unencrypted,encrypted);
    if(!isCorrect){
      throw CustomError.unAuthorized('Credentials is incorrect');
    }
  }

  //3 generar un token

 private async generateToken(payload: any, duration:string){
  const token = await JwtAdapter.generateToken(payload, duration);

  if(!token) throw CustomError.internalServer('Error generating token');

  return token;
  
 }

}

  