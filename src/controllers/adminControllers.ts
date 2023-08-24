import admin from "../models/admin";
import { Request, Response } from "express";
import { response } from "../utils/functions/http";

const getAdmin = async (req: Request, res: Response) => {
    try {
        const admin_list = await admin.find();
        return response(res, 200, "Success", admin_list);
    } catch (error: any) {
        return response(res, 400, error.message, []);
    }
    }

const createAdmin = async (req: Request, res: Response) => {
    const admin_data = req.body;
    const new_admin = new admin(admin_data);
    try {
        await new_admin.save();
        return response(res, 200, "Success", new_admin);
    } catch (error: any) {
        return response(res, 400, error.message, []);
    }
    }


export default { getAdmin, createAdmin };