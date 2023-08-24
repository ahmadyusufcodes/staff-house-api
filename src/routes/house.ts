import express from "express"
const router = express.Router()
import houseController from "../controllers/houseControllers"
import {upload} from "../utils/functions/upload"
// import { protect, admin } from "../middleware/authMiddleware.js"
 
// import mongoose from "mongoose";
// const Schema = mongoose.Schema;
// // staff quarters houuse
// const HouseSchema = new Schema({
//     bedrooms: { type: Number, required: true },
//     bathrooms: { type: Number, required: true },
//     levels: { type: Number, required: true },
//     description: { type: String, default: "No description provided" },
//     images: [{ type: String }],
//     price: { type: Number, required: true },
//     location: { type: String, required: true },
//     status: { type: String, default: "available", enum: ["available", "occupied", "maintenance"] },
//     staff: { type: Schema.Types.ObjectId, ref: "Staff" },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("House", HouseSchema);

router.get("/", houseController.getHouses)
router.get("/:id", houseController.getHouseById)
router.post("/", upload, houseController.createHouse)
router.put("/:id", upload, houseController.updateHouse)
router.delete("/:id", houseController.deleteHouse)
router.post("/:id/manage", houseController.manageHouse)

export default router
