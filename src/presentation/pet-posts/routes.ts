import { Router } from "express";
import { ControllPetpost } from "./controller";
import { RegisterPetPost } from "./services/creator-pet-post-services";
import { FinderpetpostService } from "./services/finder-pet-post-services";
import { FinderpetspostService } from "./services/finder-pet-posts-services";
import { Updatepetpostservice } from "./services/updater-pet-post-services";
import { Deletepetpostservice } from "./services/eliminator-pet-post-services";
import { Approvepetpostservice } from "./services/aproved-petpostservices";
import { Rejectpetpostservice } from "./services/rejectpetpostservice";
import { AuthMiddlewers } from "../common/middlewers/auth.middlewers";
import { RoleUser } from "../../data";
import { FinderUserService } from "../users/services/finder-user-service";

export class PetRoutes {
  static get routes(): Router{
  const router = Router();
  const finderUserService = new FinderUserService();
  const registerPetPost = new RegisterPetPost(finderUserService);
  const finderPetPost = new FinderpetpostService();
  const finderPetsPost = new FinderpetspostService();
  const updatePetPost = new Updatepetpostservice();
  const deletePetPost = new Deletepetpostservice();
  const aprovedPetPost = new Approvepetpostservice();
  const rejectPetPost = new Rejectpetpostservice();

  const controller = new ControllPetpost(
    registerPetPost,
    finderPetPost,
    finderPetsPost,
    updatePetPost,
    deletePetPost,
    aprovedPetPost,
    rejectPetPost,
  );
  
    router.post("/",AuthMiddlewers.protect,controller.create);
    router.get("/:id",controller.findOne);
    router.get("/",controller.findAll);
    router.patch("/:id",controller.update);  
    router.delete("/:id",controller.delete);  
    router.patch("/:id/approve",controller.approve);
    router.patch("/:id/reject",controller.reject);   

    return router;
  }
}
