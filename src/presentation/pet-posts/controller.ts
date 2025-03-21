import { Request, Response } from "express";
import { CreatePetPostService } from "./services/creator-pet-post-services";
import { CreatePetPostDto } from "../../domain/dtos/post-pet/create-post.dto";

export class PetPostController {
  constructor(private readonly createPetPostService: CreatePetPostService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  };

  create = (req: Request, res: Response) => {
    const [error, createPetPostDto] = CreatePetPostDto.execute(req.body);
    if (error) return res.status(422).json({ message: error });

    this.createPetPostService
      .execute(createPetPostDto!)
      .then((petPost) => res.status(201).json(petPost))
      .catch((error) => this.handleError(error, res));
  };


  findAll = (req: Request, res: Response) => {
    res.status(501).json({ message: "Not implemented" });
  };

  findOne = (req: Request, res: Response) => {
    res.status(501).json({ message: "Not implemented" });
  };

  update = (req: Request, res: Response) => {
    res.status(501).json({ message: "Not implemented" });
  };

  delete = (req: Request, res: Response) => {
    res.status(501).json({ message: "Not implemented" });
  };

  approve = (req: Request, res: Response) => {
    res.status(501).json({ message: "Not implemented" });
  };

  reject = (req: Request, res: Response) => {
    res.status(501).json({ message: "Not implemented" });
  };
}
