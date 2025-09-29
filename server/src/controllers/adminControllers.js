import Owner from "../models/Owner.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";
import streamifier from 'streamifier';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

function generateToken(owner){
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in .env");
    }
    return jwt.sign(
    {
      id: owner._id,
      name: owner.name,
      email: owner.email,
      imageUrl: owner.imageUrl,
      role: owner.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

async function registerAdmin(req, res) {
    try {
        const { name, email, password } = req.body;
        const userExist = await Owner.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        let imageUrl = null;

        if (req.file) {
            imageUrl = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "Ecommerce" },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result.secure_url);
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const owner = await Owner.create({
            name: name,
            email: email,
            password: hashedPassword,
            imageUrl: imageUrl,
        })

        res.status(201).json({
            _id: owner._id,
            name: owner.name,
            email: owner.email,
            role: owner.role,
            imageUrl: owner.imageUrl,
            token: generateToken(owner._id),
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function loginAdmin(req, res) {
    try {
        const { email, password } = req.body;

        const owner = await Owner.findOne({ email });

        if (!owner) {
            return res.status(401).json({ message: "User not exists!" });
        }
        const hashedPassword = owner.password;
        const compare = await bcrypt.compare(password, hashedPassword);

        if (!compare) {
            return res.status(401).json({ message: "Password is not correct!" });
        }

        res.status(201).json({
            token: generateToken(owner),
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export { registerAdmin, loginAdmin };