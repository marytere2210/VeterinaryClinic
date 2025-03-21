import "dotenv/config"; 
import {get} from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  NODE_ENV: get('NODE_ENV').required().asString(),
  DATABASEUSERNAME: get("DATABASEUSERNAME").required().asString(),
  DATABASEPASSWORD: get("DATABASEPASSWORD").required().asString(),
  DATABASENAME: get("DATABASENAME").required().asString(),
  DATABASEHOST: get("DATABASEHOST").required().asString(),
  DATABASEPORT: get("DATABASEPORT").required().asPortNumber(),

}; 
console.log(`PORT final:, ${envs.PORT}`);