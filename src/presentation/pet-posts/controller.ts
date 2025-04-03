import { RegisterPetPost } from "./services/creator-pet-post-services";
import { FinderpetpostService } from "./services/finder-pet-post-services";
import { FinderpetspostService } from "./services/finder-pet-posts-services";
import { Updatepetpostservice } from "./services/updater-pet-post-services";
import { Deletepetpostservice } from "./services/eliminator-pet-post-services";
import { Approvepetpostservice } from "./services/aproved-petpostservices";
import { Rejectpetpostservice } from "./services/rejectpetpostservice";
import { CustomError } from "../../domain";
import { CreatePetPostDto } from "../../domain/dtos/post-pet/create-post.dto";
import { Request, Response } from "express";
import { StatusPetPostDto } from "../../domain/dtos/post-pet/statuspetpost.dto";

export class ControllPetpost{
  constructor(
    private readonly registerPetPost: RegisterPetPost,
    private readonly finderPetPost: FinderpetpostService,
    private readonly finderPetsPost: FinderpetspostService,
    private readonly updatePetPost: Updatepetpostservice,
    private readonly deletePetPost: Deletepetpostservice,
    private readonly aprovedPetPost: Approvepetpostservice,
    private readonly rejectPetPost: Rejectpetpostservice
  ){}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  };

  create = (req: Request, res: Response) => {
   const userId = req.body.sessionUser.id;


    this.registerPetPost
    .execute(req.body, userId)
    .then((data) => res.status(201).json(data))
    .catch((error) => this.handleError(error, res));
  };

  findOne = (req: Request, res: Response) => {
    const {id} = req.params;

    this.finderPetPost
    .execute(id)
    .then((data)=> res.status(200).json(data))
    .catch((error) => this.handleError(error, res));
  };

  findAll = (req: Request, res: Response) => {
    this.finderPetsPost
    .execute()
    .then((data)=> res.status(200).json(data))
    .catch((error) => this.handleError(error, res));
  };

  update = (req: Request, res: Response) => {
    const {id} = req.params;
    const [error, updatePetPostDto] = CreatePetPostDto.execute(req.body);
    if(error){
      return res.status(422).json({message: error})
    }

    this.updatePetPost
    .execute(id, updatePetPostDto!)
    .then((data) => res.status(201).json(data))
    .catch((error) => this.handleError(error, res))
  };

  delete = (req: Request, res: Response) => {
    const {id} = req.params;
    
    this.deletePetPost
    .execute(id)
    .then((data) => res.status(204).json(data))
    .catch((error) => this.handleError(error, res))
  };

  approve = (req: Request, res: Response) => {
    const {id} = req.params;
      this.aprovedPetPost
    .execute(id)
    .then((data) => res.status(201).json(data))
    .catch((error) => this.handleError(error, res))
  }

  
  reject = (req: Request, res: Response) => {
    const {id} = req.params;
    this.rejectPetPost
    .execute(id)
    .then((data) => res.status(201).json(data))
    .catch((error) => this.handleError(error, res))
  }


}

