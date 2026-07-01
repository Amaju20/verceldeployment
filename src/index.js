
import express from "express";
import userRoutes from "./routes/userRoutes.js"
import dotenv from "dotenv"
import { connectDB } from "./db/index.js";
import cookieParser from "cookie-parser";
import cors from "cors"
dotenv.config()
const app = express()

connectDB(process.env.MONGODB_URI_TEST).then(() => {
    console.log("Database connected successfully")
}).catch((error) => {
    console.log(error)
})

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "DELETE"]
}))

app.use(cookieParser())
app.use(express.json())
app.use("/api", userRoutes)

app.get("/", (req, res) => {
    res.send("Hello, welcome!")
})

if (process.env.NODE_ENV !== "production") {
    app.listen(3000, () => {
        console.log("Server is running on port http://localhost:3000")
    })
}

export default app;