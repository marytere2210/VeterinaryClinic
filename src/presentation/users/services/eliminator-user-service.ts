import { TypeUsers } from "../../../data";
import { CustomError } from "../../../domain";

export class DeleteUsersService{
    async execute(userId: string){
      const user = await this.ensureUserExists(userId);
     user.status = false;

     try {
      await user.save();
      return{
        message:"user Deleted successfully"
      };
      
     } catch (error) {
      throw CustomError.internalServer('error deleting user');
      
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