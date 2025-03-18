import { Router } from 'express';
/**
 * Clase que define las rutas de la aplicación
 */

export class AppRoutes {
    static get Routes(): Router {
        const router = Router();
        router.get("/", (req, res) => {
            res.status(200).json({"message": "Hello World"});	
        });
        return Router();
    }
}