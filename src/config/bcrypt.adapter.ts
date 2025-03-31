import { genSaltSync, hashSync, compareSync } from "bcryptjs" 
export const encriptAdapter = {
hash:(password: string)=>{ // recibe el passw0rd
   console.log("clave recibida:", password);
   const salt =  genSaltSync(10) // encripta x 10 veces
   const hashedPassword = hashSync(password, salt);
   console.log("clave encriptada:", hashedPassword);
   return hashedPassword // el resultado de la passw0rd ya encriptado.   
},

compare:(unencrypted: string, encrypted: string)=>{

   return compareSync(unencrypted, encrypted);
}

}
