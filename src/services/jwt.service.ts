import jwt from "jsonwebtoken"

class JwtService {
    JWT_SECRET_KEY : string;

    constructor () {
        this.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!
    }

    createAccesstoken = (id : string, email :string, role : number) => {
        return new Promise((resolve,reject) => {
            jwt.sign({
                id,
                email,
                role
            },this.JWT_SECRET_KEY,{expiresIn : 1 * 60 * 60}, (err,token) => {
                if(err) reject(false);
                resolve(token);
            });
        });
    }

    verifyAccessToken = (token : string) => {
        return new Promise((resolve,reject) => {
            jwt.verify(token,this.JWT_SECRET_KEY, (err,decoded) => {
                if(err) reject(err);
                resolve(decoded);
            })
        })
    }
}

export const jwtService = new JwtService();