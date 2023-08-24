// @ts-nocheck
import express from "express";
import staff from "../models/staff";
import admin from "../models/admin";
import { response } from "../utils/functions/http";
import { createToken } from "../utils/functions/jwt";

const login = async (req: Request, res: Response) => {
    // login can be done by both admin and staff, staff can be recognized by username having this pattern "PSN1000" and admin can be anything
    const { userId, password } = req.body;
    const count_admin = await admin.countDocuments();
    if (count_admin === 0) {
        const new_admin = new admin({
            username: userId,
            password: password
        });
        await new_admin.save();
        const token = createToken({ ...new_admin._doc, role: "admin" });
        return response(res, 200, "Login success", { token });
    }

    const is_staff = userId.match(/psn[0-9]{4}/g);
    const recognize_user = is_staff ? staff : admin;
    const find_user = await recognize_user.findOne({ ...is_staff ? { staffId: { $regex: userId, $options: "i" } } : { username: { $regex: userId, $options: "i" } } });
    if (!find_user) {
        return response(res, 404, `${ is_staff ? "Staff" : "Admin" } not found`, null);
    }
    const is_password_correct = await find_user.comparePassword(password, find_user.password);
    if(!is_password_correct){
        return response(res, 401, "Wrong password", null);
    }
    const token = createToken({ ...find_user._doc, role: is_staff ? "staff" : "admin" });
    return response(res, 200, "Login success", { token });
}

export = {
    login
}