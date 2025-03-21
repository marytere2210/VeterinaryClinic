import { Router } from 'express';
import { UserRoutes } from './users/routes';
import { PetRoutes } from './pet-posts/routes';
import { UserController } from './users/controller';
import { RegisterUsers } from './users/services/register-user-service';
import { PetPostController } from './pet-posts/controller';
import { CreatePetPostService } from './pet-posts/services/creator-pet-post-services';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    const registerUsers = new RegisterUsers();
    const userController = new UserController(registerUsers);
    const userRoutes = new UserRoutes(userController);
    const createPetPostService = new CreatePetPostService();
    const petPostController = new PetPostController(createPetPostService);
    const petRoutes = new PetRoutes(petPostController);
    
    router.use('/api/users', userRoutes.routes);
    router.use('/api/pets', petRoutes.routes);

    return router; 
  }
}
