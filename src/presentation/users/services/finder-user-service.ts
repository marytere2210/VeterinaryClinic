import { TypeUsers } from "../../../data";
import { CustomError } from "../../../domain";

export class FinderUserService{
    async execute(userId: string){
      const user = TypeUsers.findOne({
        select:['id', 'name', 'email', 'password'],
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
  