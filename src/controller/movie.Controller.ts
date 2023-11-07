import { NextFunction, Request, Response } from "express";
import { Movie } from "../modal/movie.modal";
import { successResponse } from "../middleware/response";

interface CustomRequest extends Request {
  user: any;
}

class MovieController {
  constructor() {}

  createMovie = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { title, genre, rating, streamingLink } = req.body as Partial<any>;

      if (!title && !genre && !rating && !streamingLink)
        next({ code: 400, message: "All fields are required" });

      if (req.user.role != 1)
        return next({ code: 400, message: "You are not authorized to create movies" });

      const createMovie = await Movie.create({
        title: title,
        genre: genre,
        rating: +rating,
        streamingLink: streamingLink,
      });

      if (!createMovie)
        return next({ code: 400, message: "Something went wrong" });

      successResponse(res, 201, "Movie created", createMovie);
    } catch (e) {
      next(e);
    }
  };

  getAllMovie = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      let movies = await Movie.find({});

      if (!movies.length)
        return next({ code: 200, message: "No movies found" });

      successResponse(res, 200, "Movies fetch successfully", movies);
    } catch (e) {
      next(e);
    }
  };

  updateMovieById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { id, title, genre, rating, streamingLink } =
        req.body as Partial<any>;

      if (!id) return next({ code: 400, message: "Id is required" });
      const data: any = {};

      if (title) data.title = title;

      if (genre) data.genre = genre;

      if (rating) data.rating = +rating;

      if (streamingLink) data.streamingLink = streamingLink;

      const filter = { _id: id };

      const update = {
        $set: data,
      };

      const updateMovie = await Movie.findOneAndUpdate(filter, update, {
        new: true,
      });

      successResponse(res, 200, "Movie updated", updateMovie);
    } catch (e) {
      console.log(e);
      next(e);
    }
  };

  serachMovie = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      console.log(req.query);
      const { title, genre } = req.query as Partial<any>;

      if (!title && !genre)
        return next({ code: 400, message: "Title or Genre required" });

      const searchCondition: any = [];

      if (title)
        searchCondition.push({ title: { $regex: title, $options: "i" } });

      if (genre)
        searchCondition.push({ genre: { $regex: genre, $options: "i" } });

      const searchResult = await Movie.find({
        $or: searchCondition,
      });

      if (!searchResult.length)
        return next({ code: 400, message: "Movie not found" });

      successResponse(res, 200, "Movie found", searchResult);
    } catch (e) {
      next(e);
    }
  };

  deleteMovie = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { movieId } = req.body as Partial<any>;

      if (!movieId) return next({ code: 400, message: "Movie id required" });

      if (req.user.role != 1)
        return next({ code: 400, message: "You are not authorized to delete movies" });

      const searchResult = await Movie.findOne({ _id: movieId }, { _id: 1 });

      if (!searchResult)
        return next({
          code: 404,
          message: "Movie does not exist in our record",
        });

      const deleteResult = await Movie.deleteOne({ _id: movieId });

      if (deleteResult.deletedCount === 0)
        return next({ code: 400, message: "Something went wrong" });

      successResponse(res, 200, "Movie deleted successfully");
    } catch (e) {
      next(e);
    }
  };
}

export const movieController = new MovieController();
