import { Request, Response } from "express"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import swaggerUi from "swagger-ui-express"
import bodyParser from "body-parser"
const swaggerSpec = require("../swagger")
import { upload } from "./utils/functions/upload"

// import routes
import adminRoutes from "./routes/admin"
import staffRoutes from "./routes/staff"
import authRoutes from "./routes/auth"
import houseRoutes from "./routes/house"
import requestRoutes from "./routes/request"

// Create Express server
const app = express()

// Middlewares
app.use(cors())
dotenv.config()
// app.use(express.json())
// app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use(express.static("public"))
app.use(bodyParser.json({ limit: "50mb" }))
// allow access to public
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Routes
app.get("/health", (req: Request, res: Response) => {
    res.send("OK")
    }
)

app.use("/api/admin", adminRoutes)
app.use("/api/house", houseRoutes)
app.use("/api/staff", staffRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/request", requestRoutes)

app.post("/api/house/upload", upload, (req: Request, res: Response) => {
    console.log(req.body)
    res.send("OK")
})

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/attendance").then(() => console.log("Connected to MongoDB🚀"))
.catch((err) => console.log(err))

// Start Express server
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}🔥`)
})