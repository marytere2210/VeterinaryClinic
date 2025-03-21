import { Router } from "express";
import { PetPostController } from "./controller";

export class PetRoutes {
  constructor(private readonly controller: PetPostController) {}

  get routes(): Router {
    const router = Router();

    router.post("/", this.controller.create);
    router.get("/", this.controller.findAll);
    router.get("/:id", this.controller.findOne);
    router.patch("/:id", this.controller.update);
    router.delete("/:id", this.controller.delete);
    router.patch("/:id/approve", this.controller.approve);
    router.patch("/:id/reject", this.controller.reject);

    return router;
  }
}
