 import "reflect-metadata";
import { PostgresDatabase } from "./data";
import { envs } from "./config";
import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";

async function main() {
    const postgres = new PostgresDatabase({
        username: envs.DATABASEUSERNAME,
        password: envs.DATABASEPASSWORD,
        host: envs.DATABASEHOST,
        port: envs.DATABASEPORT,
        database: envs.DATABASENAME,
    });
    await postgres.connect();
    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    });
    await server.start();
}
main();