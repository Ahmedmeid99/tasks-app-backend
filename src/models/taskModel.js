import mongoose from "mongoose"

const taskModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    type: {
        type: String,
        required: false,
        trim: true,
    },
    completed: {
        type: Boolean,
        required: true,
        trim: true,
        default: false
    },
})
const Task = mongoose.model('user-tasks', taskModel)

export default Task