import express from "express";
import cors from "cors";
import adminRoutes from './routes/adminRoutes.js';

const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
}));

app.use(express.json());

app.use("/api/admin", adminRoutes);


app.get("/", (req, res) =>{
    res.send("Ecom API is running");
});

export default app;
