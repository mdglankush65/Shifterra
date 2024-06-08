import mongoose from 'mongoose';
import {CategorySchema} from './categoryModel';

const TaskSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:[true,"Please provide a id"]
    },
    category_id: {
        type: String,
        required: [true, "Please provide the category_id"],
    },
    title: {
        type: String,
        required: [true, "Please provide a tile"],
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Please provide an description"],
    },
    date: {
        type: Date,
        required: [true, "Please provide the date"]
    },
    isCompleted: {
        type: Boolean,
        default: false,
    }
})

const Task = mongoose.models.tasks || mongoose.model("tasks", TaskSchema);

export default Task;