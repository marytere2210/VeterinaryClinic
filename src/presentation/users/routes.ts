import { Router } from "express";
import { RegisterUsersService } from "./services/register-user-service";
import { LoginUsersService } from "./services/login-user-service";
import { FinderUsersService } from "./services/finder-users-service";
import { FinderUserService } from "./services/finder-user-service";
import { UpdateUsersService } from "./services/updater-user-service";
import { DeleteUsersService } from "./services/eliminator-user-service";
import { ControllerUser } from "./controller";


export class UserRoutes {
  static get routes(): Router{
    const router = Router();

    const registerUsersService = new RegisterUsersService();
    const loginUsersService = new LoginUsersService();
    const finderUsersService = new FinderUsersService(); 
    const finderUserService = new FinderUserService();
    const updateUsersService = new UpdateUsersService();
    const deleteUsersService = new DeleteUsersService();

    const controller = new ControllerUser(
    registerUsersService,
    loginUsersService,
    finderUsersService,
    finderUserService,
    updateUsersService,
    deleteUsersService
    );

    router.post("/register", controller.create.bind(controller));

    router.post("/login",controller.login);

    router.get("/",controller.findAll);

    router.get("/:id",controller.findOne);

    router.patch("/:id",controller.update);

    router.delete("/:id",controller.delete);

    return router;
  }
  }
