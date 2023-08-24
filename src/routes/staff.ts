import express from "express"
const router = express.Router()
import staffController from "../controllers/staffController"
import {upload} from "../utils/functions/upload";

// import { protect, admin } from "../middleware/authMiddleware.js"

/**
 * @swagger
 * tags:
 *   name: Staff
 *   description: API endpoints for managing staff members
 * components:
 *   schemas:
 *     Staff:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         position:
 *           type: string
 *         image:
 *           type: string
 *         description:
 *           type: string
 *         dob:
 *           type: string
 *           format: date
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         password:
 *           type: string
 *         staffId:
 *           type: string
 *
 */

/**
 * @swagger
 * /api/staff:
 *   get:
 *     summary: Get a list of staff members
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           description: The number of items to retrieve
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           description: The page number
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               staffs: [...]
 *               pagination: { total: 25, limit: 10, next: 2 }
 *       500:
 *         description: Failed to fetch staff
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to fetch staff
 *               error: ...
 */
router.get("/", staffController.getStaffs)

/**
 * @swagger
 * /api/staff:
 *   post:
 *     summary: Create a new staff member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Staff'
 *     responses:
 *       201:
 *         description: Staff created
 *         content:
 *           application/json:
 *             example:
 *               message: Staff created
 *               staff: { ... }
 *       500:
 *         description: Failed to create staff
 *         content:
 *           application/json:
 *             example:
 *               message: Failed to create staff
 *               error: ...
 */
router.post("/", upload, staffController.createStaff)
router.get("/:id", staffController.getStaffById)
router.put("/:id", upload, staffController.updateStaff)
router.delete("/:id", staffController.deleteStaff)

export default router