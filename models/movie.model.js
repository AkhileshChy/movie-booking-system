import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        posterUrl: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    }, { timestamps: true }
)

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;