import adminControllers from "../controllers/adminControllers"
import express from "express"
const router = express.Router()

router.get("/", adminControllers.getAdmin)
router.post("/", adminControllers.createAdmin)

export default router