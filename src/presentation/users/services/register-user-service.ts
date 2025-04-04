
import { encriptAdapter, envs, JwtAdapter } from "../../../config";
import { TypeUsers } from "../../../data";
import { CustomError, RegisterUserDto } from "../../../domain";
import { EmailService } from "../../common/services/email.services";



export class RegisterUsersService{
constructor(private readonly emailService : EmailService){}

  async execute(userData: RegisterUserDto){
    const user = new TypeUsers();
      
      user.name = userData.name;
      user.email = userData.email;
      user.status = false;
      user.password = this.encriptPassword(userData.password);

      const emailExists = await this.findeOneuserEmail(userData.email);
if (emailExists) throw CustomError.badRequest('Email already exists');
     
    try {
      await user.save();
      this.sendLinkValidateToken(user.email);
      return {
        message: 'User created successfully'
      }
      
    } catch (error) {
      throw CustomError.internalServer('error creating user')
    }
  }
  private findeOneuserEmail = async (email: string) => {
    const users = await TypeUsers.findOne({ where: { email: email } });
    return users;
   };
  public validateEmail = async (token:string) =>{
    const payload = await JwtAdapter.verifyToken(token);
    if(!payload) throw CustomError.unAuthorized('Invalid token');
    
    const {email} = payload as {email: string};
    if(!email) throw CustomError.notFound('Invalid token');

    const user = await this.findeOneuserEmail(email);
    if (!user) throw CustomError.notFound('User not found');
    user.status = true;
    try {
      await user.save(); 
      return {
        message: 'User activated',
      };
    } 
    catch (error) {
      throw CustomError.internalServer('Error saving user');
    }
    
  };

private sendLinkValidateToken = async (email: string) => {
  const token = await  JwtAdapter.generateToken({email}, "300s");
  console.log("Generated Token:", token);
  if(!token) throw CustomError.internalServer('Error generating token');
 
  const link = `http://${envs.WEBSERVICE_URL}/api/users/validate/${token}`;
  console.log("WEBSERVICE_URL:", envs.WEBSERVICE_URL);
  console.log("Generated Link:", link);
  const html =`
  <h1> Validate Your Email! </h1>
  <p>Click the link and verify your email</p>
  <a href="${link}">Validate your email ${email}</a>
 `;
 const isSent = await this.emailService.sendEmail({
  to: email,
  subject: 'Validate your email',
  html: html,
});

if(!isSent) throw CustomError.internalServer('Error sending email');
return true;
};
private encriptPassword(password: string): string {
  return encriptAdapter.hash(password);
 }

  
}

