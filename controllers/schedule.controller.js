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

export const getAllSchedules = async (req, res) => {
    try {
        const allSchedules = await Schedule.find();
        res.status(200).json({ msg: 'All Schedules', allSchedules });
    } catch (error) {
        
    }
}

export const getScheduleByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const queryDate = new Date(date);
        if (isNaN(queryDate.getTime())) {
            return res.status(400).json({ msg: "Invalid date format" });
        }
        const startofDay = new Date(queryDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(queryDate.setHours(23, 59, 59, 999));
        const schedule = await Schedule.find({
            showTimes: {
                $gte: startofDay,
                $lt: endOfDay
            }
        });
        if (!schedule) {
            return res.status(404).json({ msg: "Schedule not found" });
        }
        res.status(200).json({ msg: "Schedule found", schedule });
    } catch (error) {
        console.log("Error in getScheduleByDate: ", error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
}
