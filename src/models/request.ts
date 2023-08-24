import mongoose from "mongoose"
const Schema = mongoose.Schema

const RequestSchema = new Schema({
    staff: { type: Schema.Types.ObjectId, ref: "Staff" },
    house: { type: Schema.Types.ObjectId, ref: "House" },
    status: { type: String, default: "pending", enum: ["pending", "approved", "rejected"] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const Request = mongoose.model("Request", RequestSchema)
export default Request