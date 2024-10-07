import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password || !role) {
            return res.status(400).json({ msg: "All fields are required" });
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ msg: "Email already exists" });
        }
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ msg: "Username already exists" });
        }
        if (password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
        res.cookie('jwt-token', token , {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        });

        res.status(201).json({ msg: "Signup successful", newUser});
    } catch (error) {
        console.log("Error in signup: ", error.message);
		res.status(500).json({ msg: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!username ||!password ||!role) {
            return res.status(400).json({ msg: "All fields are required" });
        }
        const user = await User.findOne({ username });
        if (!user || user.role !== role) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
        res.cookie('jwt-token', token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production'
        });

        res.status(201).json({ msg: "Login Successful", user });
    } catch (error) {
        console.error("Error in login controller:", error);
		res.status(500).json({ message: "Server error" });
    }
}

export const logout = (req, res) => {
    res.clearCookie('jwt-token');
    res.status(201).json({ msg: "Logged out successfully" });
}

export const getCurrentUser = async (req, res) => {
    try {
        res.status(201).json(req.user);
    } catch (error) {
        console.error("Error in getCurrentUser controller:", error);
		res.status(500).json({ message: "Server error" });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(201).json(users);
    } catch (error) {
        console.error("Error in getAllUsers controller:", error);
        res.status(500).json({ message: "Server error" });
    }
}