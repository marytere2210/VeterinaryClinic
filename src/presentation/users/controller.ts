import { Request, Response } from "express";
import { RegisterUsers } from "./services/register-user-service";
import { LoginUsers } from "./services/login-user-service";
import { FinderUser } from "./services/finder-user-service";
import { FinderUsers } from "./services/finder-users-service";
import { DeleteUser } from "./services/eliminator-user-service";
import { UpdateUser } from "./services/updater-user-service";

export class UserController {
constructor(
    private readonly registerUser: RegisterUsers,
    private readonly updateUser: UpdateUser,
    private readonly deleteUser: DeleteUser,
    private readonly finderUsers: FinderUsers,
    private readonly finderUser: FinderUser,
    private readonly login: LoginUsers,


){}

createPet = (req: Request, res: Response) => {


}

updatePet = (req: Request, res: Response) => {

}

DeletePet = (req: Request, res: Response) => {

}

}

