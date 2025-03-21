import { RegisterUsers } from "./services/register-user-service";
import { LoginUsers } from "./services/login-user-service";
import { FinderUser } from "./services/finder-user-service";
import { FinderUsers } from "./services/finder-users-service";
import { DeleteUser } from "./services/eliminator-user-service";
import { UpdateUser } from "./services/updater-user-service";
import { RegisterUserDto } from "../../domain/dtos/users/create-user-post.dto";
import { LoginUserDto } from "../../domain/dtos/users/login-user.dto";
import { UpdateUserDto } from "../../domain/dtos/users/update-user.dto";
import { Request, Response } from "express";

export class UserController {
  constructor(
    private readonly registerUser: RegisterUsers,
    private readonly updateUser: UpdateUser,
    private readonly deleteUser: DeleteUser,
    private readonly finderUsers: FinderUsers,
    private readonly finderUser: FinderUser,
    private readonly login: LoginUsers
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  };
  create = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.execute(req.body);

    if (error) return res.status(422).json({ message: error });

    this.registerUser
      .execute(registerUserDto!)
      .then((msg) => res.status(201).json(msg))
      .catch((error) => this.handleError(error, res));
  };
  Login = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.execute(req.body);
    if (error) return res.status(422).json({ message: error });

    this.login
      .execute(loginUserDto!)
      .then((msg) => res.status(200).json(msg))
      .catch((error) => this.handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const userId = req.params.id;
    const [error, updateUserDto] = UpdateUserDto.execute(req.body);
    if (error) return res.status(422).json({ message: error });

    this.updateUser
      .execute(userId, updateUserDto!)
      .then((user) => res.status(200).json(user))
      .catch((error) => this.handleError(error, res));
  };

  delete = (req: Request, res: Response) => {
    const userId = req.params.id;
    this.deleteUser
      .execute(userId)
      .then((user) => res.status(200).json(user))
      .catch((error) => this.handleError(error, res));
  };

  FindOne = (req: Request, res: Response) => {
    const userId = req.params.id;
    this.finderUser
      .execute(userId)
      .then((user) => res.status(200).json(user))
      .catch((error) => this.handleError(error, res));
  };

  FindAll = (req: Request, res: Response) => {
    this.finderUsers
      .execute()
      .then((users) => res.status(200).json(users))
      .catch((error) => this.handleError(error, res));
  };
}

