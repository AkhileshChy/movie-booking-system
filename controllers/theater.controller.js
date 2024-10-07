import Theater from "../models/theater.model.js";

export const getAllTheaters = async (req, res) => {
    try {
        const allTheaters = await Theater.find();
        res.status(200).json({ msg: 'All Theaters', allTheaters });
    } catch (error) {
        console.log("Error in getAllTheater: ", error.message);
		res.status(500).json({ msg: "Internal server error" });
    }
}

export const createTheater = async (req, res) => {
    try {
        const { name, location, screens } = req.body;
        if (!name || !location || !screens) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const theaters = await Theater.find({ name });
        for (const theater of theaters){
            if (theater.name === name && theater.location === location){
                return res.status(200).json({ msg: "This theater already exists at this location" });
            }
        }

        const newTheater = new Theater({
            name,
            location,
            screens,
            owner: req.user.id
        });

        await newTheater.save();
        res.status(201).json({ msg:"Theater created Successfully", newTheater });
    } catch (error) {
        console.log("Error in createTheater: ", error.message);
		res.status(500).json({ msg: "Internal server error" });
    }
}

export const deleteTheater = async (req, res) => {
    try {
        const userId = req.user._id;
        const theaterId = req.params.id;
        const theater = await Theater.findById(theaterId);
        if (req.user.role === 'theaterOwner' && theater.owner !== userId){
            return res.status(403).json({ msg: "Unauthorized to delete this theater" });
        }
        if (!theater) {
            return res.status(404).json({ msg: "Theater not found" });
        }

        await Theater.findByIdAndDelete(theaterId);
        res.status(201).json({ msg:"Theater deleted Successfully", theater });
    } catch (error) {
        console.log("Error in deleteTheater: ", error.message);
		res.status(500).json({ msg: "Internal server error" });
    }
}

