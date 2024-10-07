import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        schedule: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Schedule',
            required: true
        },
        seats: [
            {
                seatNumber: {
                    type: String,
                    required: true
                },
                isAvailable: {
                    type: Boolean,
                    default: false
                }
            }
        ],
        totalPrice: {
            type: Number,
            required: true
        }
    }, { timestamps: true }
);

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;