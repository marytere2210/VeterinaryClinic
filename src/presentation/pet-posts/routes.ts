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

export class PetRoutes {
  static get routes(): Router{
  const router = Router();
  const registerPetPost = new RegisterPetPost();
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
    rejectPetPost
  );
  
    router.post("/",controller.create);
    router.get("/:id",controller.findOne);
    router.get("/",controller.findAll);
    router.patch("/:id",AuthMiddlewers.restricTo(RoleUser.ADMIN),controller.update);  
    router.delete("/:id",AuthMiddlewers.restricTo(RoleUser.ADMIN),controller.delete);  
    router.patch("/:id/approve",AuthMiddlewers.restricTo(RoleUser.ADMIN), controller.approve);
    router.patch("/:id/reject",AuthMiddlewers.restricTo(RoleUser.ADMIN),controller.reject);   

    return router;
  }
}
