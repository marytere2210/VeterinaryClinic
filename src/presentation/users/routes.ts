import { Router } from "express";

export class UserRoutes {
    static getRoutes(): Router {
        const router = Router();
        router.get("/", (req, res) => {
            res.status(200).json({"message": "Hello World"});	
        });

        router.post("/api/users/register", (req, res) => {
            res.status(200).json({"message": "Hello World"});	
        });

        router.post("/api/users/login", (req, res) => {
            res.status(501).json({mesagge:"No yet implemented"});	
        });

        router.get("/api/users", (req, res) => {
            res.status(200).json({"message": "Hello World"});	
        });

        router.get("/api/users/:id", (req, res) => {
            res.status(200).json({"message": "Hello World"});	
        });

        router.patch("/api/users/:id", (req, res) => {
            res.status(200).json({"message": "Hello World"});	
        });
        
        router.delete("/api/users/:id", (req, res) => {
            res.status(200).json({"message": "Hello World"});	
        });
        
        
        
        return Router();
    }
}