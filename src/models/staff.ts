import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const Schema = mongoose.Schema

const StaffSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true,
    },
    department: {
        type: String,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    dob: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    staffId: {
        type: String,
        required: true
    }
})

StaffSchema.pre("save", function (next) {
    const staff = this
    if (!staff.isModified("password")) return next()
    bcrypt.hash(staff.password, 10, (err: Error | undefined, hash: string) => {
        if (err) return next(err as any)
        staff.password = hash
        next()
    })
})

StaffSchema.methods.comparePassword = function (password: string, hashed_password: string) {
    return bcrypt.compareSync(password, hashed_password)
}

StaffSchema.methods.generateToken = function (cb: Function) {
    const staff = this
    const token = jwt.sign(staff._id.toHexString(), process.env.SECRET_KEY as string)
    staff.token = token
    staff.save((err: Error | undefined, staff: any) => {
        if (err) return cb(err)
        cb(null, staff)
    })
}

export default mongoose.model("Staff", StaffSchema)