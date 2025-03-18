import "reflect-metadata"
import {envs} from "./config";
import express,{ Router } from "express";
import { Server } from "./presentation/server";

async function main(){
    const server = new Server({port: 3000, routes: Router()});
    await server.start();
}
main();

export class AppRoutes{

    static getRoutes(): Router{
        const router = Router();
        
        return router;

}
}

