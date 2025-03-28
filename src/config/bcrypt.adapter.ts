import { genSaltSync, hashSync, compareSync } from "bcryptjs" 



export const encriptAdapter = {
hash:(password: string)=>{ // recibe el passw0rd
   const salt =  genSaltSync(10) // encripta x 10 veces
   return hashSync(password, salt) // el resultado de la passw0rd ya encriptado.   
},

compare:(unencrypted: string, encrypted: string)=>{

   return compareSync(unencrypted, encrypted);
}

}
