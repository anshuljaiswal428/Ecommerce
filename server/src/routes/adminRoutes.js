import express from 'express';
import { loginAdmin, registerAdmin } from '../controllers/adminControllers.js';
import upload from '../middlewares/upload.js';

export const router = express.Router();

router.post("/register",upload.single("image") ,registerAdmin);
router.post("/login", loginAdmin);

export default router;