import { TypeUsers } from "../../../data";
import { CustomError } from "../../../domain";

export class FinderUsersService{
    async execute(){

      try {
        return TypeUsers.find({   
          select:['id', 'name', 'email', 'password'],
        where: {
          status: true, 
        },
      })
        
      } catch (error) {

        throw CustomError.internalServer('error fetching user');

                
      }
    }
  }