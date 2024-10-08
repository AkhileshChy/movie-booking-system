import Schedule from "../models/schedule.model.js";
import Theater from "../models/theater.model.js";

export const createSchedule = async (req, res) => {
    try {
        const { movieId, theaterId, screen, showTimes, price } = req.body;
        if (!movieId || !theaterId || !screen || !showTimes || !seats || !price) {
            return res.status(400).json({ msg: "All fields are required" });
        } 
        const userId = req.user._id;
        const theater = await Theater.findById(theaterId);
        if (theater.owner !== userId) {
            return res.status(403).json({ msg: "Unauthorized to create schedule for this theater" });
        }
        // add screen availability check
        let seats;
        for (const screen of theater.screens) {
            if (screen.screenNumber === screen){
                seats = screen.seats;
                break;
            }
        }
        const newSchedule = new Schedule({
            movie: movieId,
            theater: theaterId,
            screen,
            showtimes,
            seats,
            price
        })

        await newSchedule.save();
        res.status(201).json({ msg: "Schedule created successfully", schedule });
    } catch (error) {
        console.log("Error in createSchedule: ", error.message);
		res.status(500).json({ msg: "Internal server error" });
    }
}