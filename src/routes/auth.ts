// @ts-nocheck
import { Router } from "express"
import authControllers from "../controllers/authControllers"

const router = Router()

// router.post("/register", authControllers.register)
router.post("/login", authControllers.login) // @ts-ignore
// router.post("/logout", authControllers.logout)


export default router