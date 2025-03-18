import express, { Router } from "express";

/** 
 * Interfaz que define las acciones a ejecutarse cuando se inicia  el servidor
 */
interface options{
    port: number;
    routes: Router;
}

/**
 * Clase que define el servidor */

export class Server{
    public readonly app = express();
    public readonly port: number;
    public readonly routes: Router;


/**
 * Constructor de la clase
 * @param options 
 */

constructor(options: options){
    this.port = options.port;
    this.routes = options.routes;
}
/**
 * inicia el servidor y escucha en el puerto definido
 */
async start(){
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(this.routes);
    this.app.listen(this.port, () => {
        console.log(`Server running on http://localhost:${this.port}`);
   
    });
}
}