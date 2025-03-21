import { DataSource } from "typeorm"
import { Petpost } from "./models/pet-post-model"
import { TypeUsers } from "./models/user-model"
/**
 * Option para la clase PostgresDatabase
  */
interface Options {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}
/**
 * Clase que se encarga de la conexión a la base de datos Postgres
 */
export class PostgresDatabase {
  public datasource: DataSource;
  
  constructor(options: Options){
    this.datasource = new DataSource({
        type: "postgres",
        host: options.host, 
        port: options.port,
        username: options.username,
        password: options.password,
        database: options.database, 
        synchronize: true,
        entities: [Petpost, TypeUsers],
        ssl:{
            rejectUnauthorized: false
        },
        })

}
/**
 * Método que se encarga de la conexión a la base de datos
 */
async connect(){
    try{
        await this.datasource.initialize()
        console.log("Connected to Postgres")
    }
    catch(error){  
        console.log("Error Connecting to Postgres", error)
    }
}

}