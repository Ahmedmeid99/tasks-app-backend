import mongoose from "mongoose"

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    quate: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    token: {
        type: String,
    },
})
const User = mongoose.model('user-data', userModel)

export default User