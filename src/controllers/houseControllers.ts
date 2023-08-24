import house_col from "../models/house"
import { Request, Response } from "express"
import { IHouse } from "../utils/types/house"
import { response } from "../utils/functions/http"
import jwt from "jsonwebtoken"

// router.get("/", houseController.getHouses)
// router.get("/:id", houseController.getHouseById)
// router.post("/", houseController.createHouse)
// router.put("/:id", houseController.updateHouse)
// router.delete("/:id", houseController.deleteHouse)
// router.post("/:id/manage", houseController.manageHouse)

const getHouses = async (req: Request, res: Response): Promise<void> => {
    try {
        const { my_houses } = req.query
        if (my_houses) {
            const token = req.headers.authorization?.split("Bearer")[1].trim()
            const { user: staff } = jwt.decode(token as string) as jwt.JwtPayload
            const houses = await house_col.find({ occupant: staff._id })
            return response(res, 200, "Success", {houses})
        }
        const { page = 1, limit = 10 } = req.query
        const total_houses = await house_col.find().countDocuments()
        const houses = await house_col.find().limit(Number(limit)).skip((Number(page) - 1) * Number(limit))
        return response(res, 200, "Success", {houses, pagination: {page, limit, total: total_houses}})
    } catch (error: any) {
        return response(res, 500, "", error.message)
    }
}

const getHouseById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const house: IHouse | null = await house_col.findById(id)
        return response(res, 200, "Success", house)
    } catch (error: any) {
        return response(res, 500, "", error.message)
    }
}

const createHouse = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as IHouse
        const house = new house_col(req.body)
        const newHouse = await house.save()
        return response(res, 201, "Success", newHouse)
    } catch (error: any) {
        return response(res, 500, "", error.message)
    }
}

const updateHouse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const body = req.body as IHouse
        const house: IHouse | null = await house_col.findByIdAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        )
        return response(res, 200, "Success", house)
    }
    catch (error: any) {
        return response(res, 500, "", error.message)
    }
}

const deleteHouse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const deletedHouse: IHouse | null = await house_col.findByIdAndRemove(id)
        return response(res, 200, "Success", deletedHouse)
    } catch (error: any) {
        return response(res, 500, "", error.message)
    }
}

const manageHouse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { status } = req.body
        const house: IHouse | null = await house_col.findByIdAndUpdate(
            { _id: id },
            { status },
            { new: true }
        )
        return response(res, 200, "Success", house)
    } catch (error: any) {
        return response(res, 500, "", error.message)
    }
}

export default {
    getHouses,
    getHouseById,
    createHouse,
    updateHouse,
    deleteHouse,
    manageHouse
}