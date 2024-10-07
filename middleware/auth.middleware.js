import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies['jwt-token'];
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ msg: 'Token is invalid' });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ msg: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
		res.status(500).json({ message: "Internal server error" });
    }
}