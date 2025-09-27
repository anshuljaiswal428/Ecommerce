import Owner from "../models/Owner.js";
import bcrypt from "bcryptjs";

async function registerAdmin (req, res) {
    try {
        const { name, email, password } = req.body;
        const userExist = await Owner.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const owner = await Owner.create({
            name: name,
            email: email,
            password: hashedPassword,
        })

        res.status(201).json({
            _id: owner._id,
            name: owner.name,
            email: owner.email,
            role: owner.role,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export {registerAdmin};