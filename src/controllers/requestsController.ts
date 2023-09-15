// @ts-nocheck
import request_col from "../models/request";
import house_col from "../models/house";
import staff_col from "../models/staff";
import express from "express";
import { Request, Response } from "express";
import { response } from "../utils/functions/http";
import {decodeToken} from "../utils/functions/jwt";
import { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken';


const getRequests = async (req: Request, res: Response) => {
    try {
      const { limit = 10, page = 1 } = req.query;
      const skip = (Number(page) - 1) * Number(limit);
      const requests = await request_col.find()
        .limit(Number(limit))
        .skip(skip)
        .populate('house', 'bedrooms bathrooms levels address')
        .populate('staff', 'name email phone');
  
      const fine_grain_requests = requests.map((request) => {
          const {bedrooms, bathrooms, levels, address} = request.house;
          const {name, email, phone, department} = request.staff;
        return {
          staff_email: email,
          staff_dept: department,
          house_desc: `${bedrooms}bdrm, ${bathrooms}bath, ${levels}lvl at ${address}`,
          staff_phone: phone,
          staff_name: name,
          createdAt: request.createdAt,
          updatedAt: request.updatedAt,
          status: request.status,
          _id: request._id,
        }
    });
  
      const total = await request_col.countDocuments();
      const pagination = { total, limit: Number(limit), page: Number(page) };
      return response(res, 200, 'success', { requests: fine_grain_requests, pagination });
    } catch (error) {
      console.error(error);
      return response(res, 500, 'error', 'server error');
    }
  };

const createRequest = async (req: Request, res: Response) => {
    try {
        const {house} = req.body;
        const token = req.headers.authorization?.split("Bearer")[1].trim();
        const {user: staff} = jwt.decode(token as string) as JwtPayload;
        // console.log(user._id);
        const check_house_is_available = await house_col.findOne({_id: house});
        if(!check_house_is_available) return response(res, 404, "error", "house not found");
        if(check_house_is_available.status !== "available") return response(res, 404, "error", "House not available");
        await house_col.findOneAndUpdate({_id: house}, {"$push": {requests: staff}});
        const check_staff_exist = await staff_col.findOne({_id: staff});
        if(!check_staff_exist) return response(res, 404, "error", "staff not found");
        const request = await request_col.create({house, staff});
        const save_request = await request.save();
        return response(res, 200, "success", save_request);
        // return response(res, 200, "success", "adiu");
    } catch (error) {
        return response(res, 500, "error", error);
    } 
}

const reviewRequest = async (req: Request, res: Response) => {
    try {
        const {status, staff, house} = req.body;
        const {id} = req.params;
        const find_request = await request_col.findOne({_id: id});
        if(!find_request) return response(res, 404, "error", "request not found");
        if (status === "approved") {
            const find_house = await house_col.findOne({_id: find_request.house});
            if(!find_house) return response(res, 404, "error", "house not found");
            if(find_house.status !== "available") return response(res, 404, "error", "House not available");
            find_house.status = "occupied";
            find_house.occupant = find_request.staff;
            const save_house = await find_house.save();
        }
        find_request.status = status;
        const save_request = await find_request.save();
        return response(res, 200, "success", save_request);
    } catch (error) {
        return response(res, 500, "error", error);
    }
}


export default {
    getRequests,
    createRequest,
    reviewRequest
};