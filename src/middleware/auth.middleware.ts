import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwt.service";

interface CustomRequest extends Request {
    user : any;
}


export const verifyAccessToken = async (req : CustomRequest, res: Response, next : NextFunction) : Promise<any> => {
    try{

        // console.log(req.body.token, req.query.token,req.headers);
        let tokenFromReq = req.body.token || req.query.token || req.headers['x-access-token'];

        if (req.headers['authorization']) {
            const authHeader = req.headers['authorization'];
            if (!authHeader) return next({ status: 401, message: 'Access Denied token required' });
            tokenFromReq = authHeader.split(" ")[1];
        }
        if (tokenFromReq == null) return next({ status: 401, message: 'Access Denied' });

        const payload :any = await jwtService.verifyAccessToken(tokenFromReq);

        if(!payload) return next({code : 400, message : "Token is expired"});

        delete payload.iat;
        delete payload.exp;

        req.user = payload;

        next();

    }catch(e){
        console.log(e);
        next(e);
    }
}