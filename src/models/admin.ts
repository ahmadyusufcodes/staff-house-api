import mongoose from "mongoose"
import bcrypt from "bcrypt"
const Schema = mongoose.Schema

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 20
    }
})

AdminSchema.pre("save", function(next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

AdminSchema.methods.comparePassword = function (password: string, hashed_password: string) {
    return bcrypt.compareSync(password, hashed_password)
}
 
export default mongoose.model("Admin", AdminSchema)