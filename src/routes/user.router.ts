import { Router, Response, Request, NextFunction } from "express";
import { movieController } from "../controller/movie.Controller";


class UserRoute {

    router : any;
    constructor () {
        this.router = Router();
        this.init();
    }

    init(){
        this.router.post("/create-movie", movieController.createMovie);
        this.router.get("/get-all-movies", movieController.getAllMovie);
        this.router.put("/update-movie", movieController.updateMovieById);
        this.router.get("/search-movie", movieController.serachMovie);
        this.router.delete("/delete-movie", movieController.deleteMovie);
    }

    getRouters(){
        return this.router;
    }
}

export const userRoute = new UserRoute();