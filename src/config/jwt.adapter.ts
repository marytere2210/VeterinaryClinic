import jwt  from "jsonwebtoken";
import { envs } from "./envs";

export class JwtAdapter {

    static async generateToken (payload: any, duration: string = "3h")
    {

        return new Promise((resolve) => 
            {
              jwt.sign(payload, envs.SECRETKEYJWT, {expiresIn: duration}, (error, token) =>{
                console.log("JWT Secret Key:", envs.SECRETKEYJWT); // Verifica si es undefined
                if(error) return resolve(null);
                
                resolve(token);
              });

            })
    }

    static async verifyToken(token: string){return new Promise((resolve) =>
           {
     jwt.verify(token, envs.SECRETKEYJWT, (error:any, decoded:any)=>
              {
               if(error)
                {    
                console.log("error verificando token",error);
                return resolve(null);
              }
              resolve(decoded);
              });
          });
      }
    }