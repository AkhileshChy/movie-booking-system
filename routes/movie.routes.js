import express from "express";
import authorize from "../middleware/rbac.middleware.js";
import { createMovie, getAllMovies } from "../controllers/movie.controller.js";

const router = express.Router();

router.get('/allmovies', getAllMovies);
router.post('/create', authorize(['admin']), createMovie);


export default router;