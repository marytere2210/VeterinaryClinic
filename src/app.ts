 import "reflect-metadata";
import { envs } from "./config/envs";
import { PostgresDatabase } from "./data";
import { AppRoutes } from "./presentation/routes";
import { ServerPostgre } from "./presentation/server";

 async function main(){
  
  const postgres = new PostgresDatabase({
    username: envs.DATABASEUSERNAME,
    password: envs.DATABASEPASSWORD,
    host: envs.DATABASEHOST,
    port: envs.DATABASEPORT, 
    database: envs.DATABASENAME,
});
    await postgres.connect();
    console.log("Connected to database");

    const server = new ServerPostgre({
      port: envs.PORT,
      routes: AppRoutes.routes,
    });

    await server.start();
 }
    main();


