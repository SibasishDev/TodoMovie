
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();

import { mainRouter } from "./routes/main.routers";
import { errorHandler } from "./middleware/response";
import { mongoDB } from "./config/mongodb.connection";

class App {

    app : any;
    port : number;

    constructor () {
        this.app = express();
        this.port = +process.env.PORT! || 8001;
    }

    init(){
        this.addMiddlewareRoutes(this.app);
        this.listenPort(this.app,this.port);
    }

    addMiddlewareRoutes(app : any){
        app.use(express.json(),express.urlencoded({extended : true}));
        app.use(morgan("dev"));
        app.use(cors());
        app.use(helmet());

        mongoDB.connect();

        app.use("/api", mainRouter.getRouters());
        app.use(errorHandler);

    }

    listenPort(app :any, port : number) {
        app.listen(port, () => {
            console.log(`Server is listening to port : ${port}`);
        });
    }
}

export const app = new App();
