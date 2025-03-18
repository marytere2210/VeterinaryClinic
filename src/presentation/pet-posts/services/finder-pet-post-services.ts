
import { TypeUsers } from "../../../data/postgres/models/user-model";

export class FinderUsers {
    constructor() {}
      async executed(){
        return await TypeUsers.find();
      } 
       
}  