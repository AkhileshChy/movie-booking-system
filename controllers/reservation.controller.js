import Schedule from "../models/schedule.model";

export const createReservation = async (req, res) => {
    try {
        const { userId, scheduleId, seats } = req.body;
        if (!userId || !scheduleId || !seats){
            return res.status(400).json({ msg: "All fields are required" });
        }
        const schedule = await Schedule.findById(scheduleId);
        if (!schedule) {
            return res.status(404).json({ msg: "Schedule not found" });
        }
        const unavailableSeats = seats.filter(seat => {
            const seatInSchedule = schedule.seats.find(s => s.seatNumber === seat.seatNumber);
            return !seatInSchedule || !seatInSchedule.isAvailable;
        })

        if (unavailableSeats.length > 0) { 
            return res.status(400).json({ msg: "Some seats are unavailable", unavailableSeats });
        }

        const totalPrice = seats.length * schedule.price;
        const reservation = new Reservation({
            user: userId,
            schedule: scheduleId,
            seats,
            totalPrice
        });
        await reservation.save();

        seats.forEach(seat => {
            const seatInSchedule = schedule.seats.find(s => s.seatNumber === seat.seatNumber);
            if (seatInSchedule) {
                seatInSchedule.isAvailable = false;
            }
        });
        await schedule.save();

        res.status(201).json({ msg: "Reservation created successfully", reservation });
    } catch (error) {
        console.error("Error in createReservation: ", error.message);
        res.status(500).json({ msg: "Internal server error" });
    }
}