import { TypeUsers } from "../../../data";
import { CustomError, RegisterUserDto } from "../../../domain";

export class UpdateUsersService{
    async   execute(userId: string, userData: RegisterUserDto){
      const user = await this.ensureUserExists(userId);
      user.name = userData.name,
      user.email = userData.email;
   

      try {
        await user.save();
        return{
          message:"user Updated successfully"
        };
      } catch (error) {
        throw CustomError.internalServer('error updating user');
      }
    }
      private async ensureUserExists(userId: string){
        const user = await TypeUsers.findOne({
                select:['id'],
                where: {
                  id: userId,
                  status: true, 
                },
              });
        
              if(!user){
                throw CustomError.notFound('User not found');
              }
              return user;
              }
          
      
    
}

