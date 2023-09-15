import staff_col from "../models/staff";
import { Request, Response } from "express";
import { StaffType } from "../utils/types/staff";
import { response } from "../utils/functions/http";

// router.get("/", staffController.getStaffs)
// router.post("/", staffController.createStaff)
// router.get("/:id", staffController.getStaffById)
// router.put("/:id", staffController.updateStaff)
// router.delete("/:id", staffController.deleteStaff)

// interface StaffType {
//     name: string;
//     position: string;
//     image: string;
//     description: string;
//     dob: string;
//     email: string;
//     phone: string;
//     address: string;
//     password: string;
//     staffId: string;
// }

const getStaffs = async (req: Request, res: Response) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const staffs = await staff_col
      .find()
      .limit(Number(limit))
      .skip((Number(page) - 1) * 10);
    const total = await staff_col.countDocuments();
    return response(res, 200, "Success", {
      staffs,
      pagination: { total, limit: +limit, page: Number(page) },
    });
  } catch (error) {
    return response(res, 500, "Failed to fetch staff", error);
  }
};

const createStaff = async (req: Request, res: Response) => {
  try {
    const {
      name,
      position,
      image,
      description,
      dob,
      email,
      phone,
      address,
      password,
      department,
      staffId,
    }: StaffType = req.body;
    const staff = await staff_col.create({
      name,
      position,
      image,
      description,
      dob,
      email,
      phone,
      address,
      password,
      department,
      staffId,
    });
    // if (image) await upload.uploadImagesAndGetUrls([image], "staff");
    return response(res, 201, "Staff created", staff);
  } catch (error) {
    return response(res, 500, "Failed to create staff", error);
  }
};

const getStaffById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const staff = await staff_col.findById(id);
    return response(res, 200, "Success", staff);
  } catch (error) {
    return response(res, 500, "Failed to fetch staff", error);
  }
};

const updateStaff = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      position,
      image,
      description,
      dob,
      email,
      phone,
      address,
      password,
      department,
      staffId,
    }: StaffType = req.body;
    const updated_staff = await staff_col.findOneAndUpdate(
      { _id: id },
      {
        name,
        position,
        image,
        description,
        dob,
        email,
        phone,
        address,
        password,
        department,
        staffId,
      },
      { new: true }
    );
    return response(res, 200, "Staff updated", updated_staff);
  } catch (error) {
    return response(res, 500, "Failed to update staff", error);
  }
};

const deleteStaff = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted_staff = await staff_col.findByIdAndDelete(id);
    return response(res, 200, "Staff deleted", deleted_staff);
  } catch (error) {
    return response(res, 500, "Failed to delete staff", error);
  }
};

export default {
    getStaffs,
    createStaff,
    getStaffById,
    updateStaff,
    deleteStaff
}