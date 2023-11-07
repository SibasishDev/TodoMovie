import bcrypt from "bcrypt";

class BcryptService {

    saltRounds : number;
    constructor () {
        this.saltRounds = 10;
    }

    encryptPassword = (password : string) => {
        return bcrypt.hash(password,this.saltRounds);
    }

    decryptPassword =  (password : string, hashPassword : string) => {
        return bcrypt.compare(password,hashPassword);
    }
}


export const becryptService = new BcryptService();