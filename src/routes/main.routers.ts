import { Router, Response, Request, NextFunction } from "express";
import { authController } from "../controller/auth.Controller";
import { userRoute } from "./user.router";
import { verifyAccessToken } from "../middleware/auth.middleware";


class MainRouter {
    router : any;
    constructor() {
        this.router = Router();
        this.init();
    }

    init(){
        this.router.get("/test", (req :Request, res : Response, next : NextFunction) => {
            return res.send("Hello from server");
        });

        this.router.post("/login", authController.login);
        this.router.post("/register", authController.register);

        this.router.use(verifyAccessToken);

        this.router.use("/",userRoute.getRouters());

        this.router.use("*", (req : Request, res : Response, next : NextFunction) => {
            return res.status(404).json({
                code : 404,
                message : "Not found"
            });
        })
    }

    getRouters(){
        return this.router;
    }

}

export const mainRouter = new MainRouter();