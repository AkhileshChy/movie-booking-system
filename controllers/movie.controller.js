import Movie from "../models/movie.model.js";

export const getAllMovies = async (req, res) => {
    try {
        const allmovies = await Movie.find();
        res.status(200).json({ msg: 'All Movies', allmovies });
    } catch (error) {
        console.log("Error in getAllMovies: ", error.message);
		res.status(500).json({ msg: "Internal server error" });
    }
}

export const createMovie = async (req, res) => {
    try {
        const { title, description, duration, posterUrl, country } = req.body;
        if (!title || !description || !duration  || !country || !posterUrl) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const movies = await Movie.find({ title });
        for (const movie of movies){
            if (movie.title === title ){
                return res.status(200).json({ msg: "This movie already exists" });
            }
        }

        const newMovie = new Movie({
            title,
            description,
            duration,
            posterUrl,
            country
        });

        await newMovie.save();
        res.status(201).json({ msg:"Movie created Successfully", newMovie });
    } catch (error) {
        console.log("Error in movieTheater: ", error.message);
		res.status(500).json({ msg: "Internal server error" });
    }
}