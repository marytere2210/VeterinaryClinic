import { Router, Request, Response} from "express";

/**
 * Clase que define las rutas de la entidad PetPost
 */

export class PetRoutes {
    static getRoutes(): Router {
        const router = Router();
        
        router.post("/api/petposts", (req:Request, res:Response) => {
            res.status(200).json({"message": "Hello World"});	
        });

        router.get("/api/petposts", (req:Request, res:Response) => {
            res.status(200).json({"message": "Hello World"});	
        });

        router.get("/api/petposts/:id", (req:Request, res:Response) => {
            res.status(200).json({"message": "Hello World"});	
        });

        router.patch("/api/petposts/:id", (req:Request, res:Response) => {
            res.status(200).json({"message": "Hello World"});	
        });

        
        router.delete("/api/petposts/:id", (req:Request, res:Response) => {
            res.status(200).json({"message": "Hello World"});	
        });

        router.patch("/api/petposts/:id/approve", (req:Request, res:Response) => {
            res.status(200).json({"message": "Hello World"});	
        });

        router.patch("/api/petposts/:id/reject", (req:Request, res:Response) => {
            res.status(200).json({"message": "Hello World"});	
        });
        return Router();
    }
}	