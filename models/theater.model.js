import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        screens: [
            {
                screenNumber: {
                    type: Number,
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
                            default: true
                        }
                    }
                ],
                isAvailable: {
                    type: Boolean,
                    default: true
                }
            }
        ],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }, {timestamps: true}
);

const Theater = mongoose.model('Theater', theaterSchema);

export default Theater;