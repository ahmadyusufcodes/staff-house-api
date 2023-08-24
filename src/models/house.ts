import mongoose from "mongoose";
const Schema = mongoose.Schema;
// staff quarters houuse
const HouseSchema = new Schema({
    name: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    levels: { type: Number, required: true },
    description: { type: String, default: "No description provided" },
    images: [{ type: String }],
    requests: [{ type: Schema.Types.ObjectId, ref: "Staff" }],
    price: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, default: "available", enum: ["available", "occupied", "maintenance"] },
    occupant: { type: Schema.Types.ObjectId, ref: "Staff" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("House", HouseSchema);