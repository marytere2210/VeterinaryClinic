import { DeleteUsersService } from "./services/eliminator-user-service";
import { RegisterUserDto } from "../../domain/dtos/users/create-user-post.dto";
import { Request, Response } from "express";
import { CustomError, LoginUserdto } from "../../domain";
import { RegisterUsersService } from "./services/register-user-service";
import { LoginUsersService } from "./services/login-user-service";
import { FinderUserService } from "./services/finder-user-service";
import { UpdateUsersService } from "./services/updater-user-service";
import { FinderUsersService } from "./services/finder-users-service";
import { envs } from "../../config";


export class ControllerUser {
  constructor(
    private readonly registerUser: RegisterUsersService,
    private readonly finderUsers: FinderUsersService,
    private readonly finderUser: FinderUserService,
    private readonly updateUser: UpdateUsersService,
    private readonly deleteUser: DeleteUsersService,
    private readonly login: LoginUsersService
  ) {}

  private handleError = (error: unknown, res: Response) => {
  if(error instanceof CustomError){
    return res.status(error.statusCode).json({message: error.message});
  }
  
  console.log(error);

  return res.status(500).json({message: 'Internal Server Error'});
  };
  create = (req: Request, res: Response)=> {
    const [error, registerUserDto] = RegisterUserDto.execute(req.body);
    if(error){
      return res.status(422).json({message: error})
        }
    this.registerUser
    .execute(registerUserDto!)
    .then((message) => res.status(201).json(message))
      .catch((err) => this.handleError(err, res));
  };

  Login = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserdto.execute(req.body);
    if (error) return res.status(422).json({ message: error });

    this.login
      .execute(loginUserDto!)
      .then((data) => {
        res.cookie('token', data.token, {
          httpOnly: true,
          secure: envs.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 3 * 60 * 60 * 1000,
        });

        return res.status(200).json({ user: data.user });
      })
      .catch((error) => this.handleError(error, res));
  };

  findAll = (req: Request, res: Response)=> {
    this.finderUsers
    .execute()
    .then((data) => res.status(201).json(data))
    .catch((error) => this.handleError(error, res))
  };
  findOne = (req: Request, res: Response)=> {
    const {id} = req.params;
    
    this.finderUser
    .execute(id)
    .then((data) => res.status(201).json(data))
    .catch((error) => this.handleError(error, res))
  };
  update = (req: Request, res: Response)=> {
    const {id} = req.params;
    const [error, registerUserDto] = RegisterUserDto.execute(req.body);
    if(error){
      return res.status(422).json({message: error})
        }
    this.updateUser
    .execute(id, registerUserDto!)
    .then((data) => res.status(201).json(data))
    .catch((error) => this.handleError(error, res))
  };
  delete = (req: Request, res: Response)=> {
    const {id} = req.params;
    
    this.deleteUser
    .execute(id)
    .then((data) => res.status(204).json(data))
    .catch((error) => this.handleError(error, res))
  };

  validate = (req: Request, res: Response)=> {
    const {token} = req.params;
    this.registerUser
    .validateEmail(token)
    .then(()=> res.send("Email verified successfully"))
    .catch((error) => this.handleError(error, res))
  };

  
  } 

