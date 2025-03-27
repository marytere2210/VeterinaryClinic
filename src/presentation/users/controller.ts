import { CustomError, RegisterUserDto } from "../../domain";
import { DeleteUsersService } from "./services/eliminator-user-service";
import { FinderUserService } from "./services/finder-user-service";
import { FinderUsersService } from "./services/finder-users-service";
import { LoginUsersService } from "./services/login-user-service";
import { RegisterUsersService } from "./services/register-user-service";
import { UpdateUsersService } from "./services/updater-user-service";
import { Request, Response } from "express";


export class ControllerUser {
  constructor(
    private readonly registerUsersService: RegisterUsersService,
    private readonly loginUsersService: LoginUsersService,
    private readonly finderUsersService: FinderUsersService,
    private readonly finderUserService: FinderUserService,
    private readonly updateUsersService: UpdateUsersService,
    private readonly deleteUsersService: DeleteUsersService
  ){}

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
    this.registerUsersService
    .execute(registerUserDto!)
    .then((data) => res.status(201).json(data))
    .catch((error) => this.handleError(error, res))
  };
  login = (req: Request, res: Response)=> {
    this.loginUsersService
    .execute()
    .then((data) => res.status(201).json(data))
    .catch((error) => this.handleError(error, res))
  };
  findAll = (req: Request, res: Response)=> {
    this.finderUsersService
    .execute()
    .then((data) => res.status(201).json(data))
    .catch((error) => this.handleError(error, res))
  };
  findOne = (req: Request, res: Response)=> {
    
    const {id} = req.params;
    
    this.finderUserService
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
    this.updateUsersService
    .execute(id, registerUserDto!)
    .then((data) => res.status(201).json(data))
    .catch((error) => this.handleError(error, res))
  };
  delete = (req: Request, res: Response)=> {
    const {id} = req.params;
    
    this.deleteUsersService
    .execute(id)
    .then((data) => res.status(204).json(data))
    .catch((error) => this.handleError(error, res))
  };
}