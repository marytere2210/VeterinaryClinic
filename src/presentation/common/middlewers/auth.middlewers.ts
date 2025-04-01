import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../../config";


export class AuthMiddlewers{

    static async  protect(req: Request, res: Response, next: NextFunction){
        // obtener el token
        const token = req.cookies.token;
        console.log("token: ", token)

        next();

    }
}