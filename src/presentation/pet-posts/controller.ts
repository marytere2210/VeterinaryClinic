import { Request, Response } from "express";

export class UserConytroller {
    static register(req: Request, res: Response) {
        res.status(200).json({ message: "Hello World" });
    }

    static login(req: Request, res: Response) {
        res.status(501).json({ mesagge: "No yet implemented" });
    }

    static getUsers(req: Request, res: Response) {
        res.status(200).json({ message: "Hello World" });
    }

    static getUser(req: Request, res: Response) {
        res.status(200).json({ message: "Hello World" });
    }

    static updateUser(req: Request, res: Response) {
        res.status(200).json({ message: "Hello World" });
    }

    static deleteUser(req: Request, res: Response) {
        res.status(200).json({ message: "Hello World" });
    }
}
