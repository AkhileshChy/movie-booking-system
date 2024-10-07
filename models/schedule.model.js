import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema(
    {
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie',
            required: true
        },
        theater: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Theater',
            required: true
        },
        screen: {
            type: Number,
            required: true
        },
        showtimes: [
            {
                type: Date,
                required: true
            }
        ],
        seats: [
            {
                seatNumber: {
                    type: String,
                    required: true
                },
                isAvailable: {
                    type: Boolean,
                    default: true
                }
            }
        ],
        price: {
            type: Number,
            required: true
        }
    }, { timestamps: true }
)

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;