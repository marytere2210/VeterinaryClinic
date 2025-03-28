import jwt  from "jsonwebtoken";
import { envs } from "./envs";
import { error } from "console";

export class JwtAdapter {

    static async generateToken (payload: any, duration: string = "3h")
    {
        return new Promise((resolve, reject) => 
            {
              jwt.sign(payload, envs.SECRETKEYJWT, {expiresIn: duration}, (error, token) =>{
                if(error) return resolve(null);
                
                resolve(token);
              });

            })
    }
}