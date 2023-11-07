import { NextFunction,Request,Response } from "express";
import { User } from "../modal/user.modal";
import { becryptService } from "../services/bcrypt.service";
import { jwtService } from "../services/jwt.service";
import { successResponse } from "../middleware/response";



class AuthController {
    constructor () {

    }

    login = async (req : Request, res : Response, next : NextFunction) : Promise<any> => {
        try{
            const {email, password} = req.body as Partial<any>

            if(!email && !password) return next({code : 400, message : "Invalid input field"});

            const checkUserExist =  await User.findOne({"email" : email},{_id : 1, email : 1, name :1, role : 1, password : 1});

            if(!checkUserExist) return next({code : 400, message : "Invalid email, user does not exist"});

            const isMatch = await becryptService.decryptPassword(password,checkUserExist.password);

            if(!isMatch) return next({code : 400, message : "Wrong password"});

            const aceessToken = await jwtService.createAccesstoken(checkUserExist._id,checkUserExist.email,checkUserExist.role);

            if(!aceessToken) return next({code : 400, message : "Error in generating token"});

            const data = {
                id : checkUserExist._id,
                email : checkUserExist.email,
                role : checkUserExist.role,
                aceessToken
            }

            successResponse(res,200,"Login successfull",data);


        }catch(e){

        }
    }

    register = async (req : Request,  res: Response, next: NextFunction) : Promise<any> => {
        try{

            const {email,name,password,repeatPassword,role} = req.body as Partial<any>;

            if(!email && !name && !role && !password && !repeatPassword) return next({code : 400, message : "All fileds are required"});

            if(!(password == repeatPassword)) return next({code : 400, message : "Password should be match with confirmpassword"});

            const hashPassword = await becryptService.encryptPassword(password);

            const creatUser: any = await User.create({
                email : email,
                name : name,
                password : hashPassword,
                role : +role
            });

            if(!creatUser) return next({code : 400, message : "Something went wrong"});

            // const { password : string, ...userWithoutPassword } = creatUser;
              
            //   console.log(password); // 'examplePassword'
            //   console.log(userWithoutPassword);

            const responseData : any =  creatUser.toJSON();

            delete responseData.password;

            successResponse(res,201,"User created successfully",responseData);

        }catch(e){
            console.log(e);
            
            next(e);
        }
    }
}

export const authController = new AuthController();