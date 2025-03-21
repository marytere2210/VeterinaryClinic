import { Router } from "express";
import { UserController } from "./controller";

export class UserRoutes {

  constructor(
    private readonly controller: UserController) {}

    get routes(): Router {
    const router = Router();

    //router.post("/", (req: Request, res: Response) => {
    //  res.status(501).json({ message: "conected" });
    //});

    router.post("/register", this.controller.create);

    router.post("/login", this.controller.Login);

    router.get("/", this.controller.FindAll);

    router.get("/:id", this.controller.FindOne);

    router.patch("/:id", this.controller.update);

    router.delete("/:id", this.controller.delete);

    return router;
  }
}
