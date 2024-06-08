import mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: [true, "Please provide a user id"]
    },
    title: {
        type: String,
        required: [true, "Please provide a tile"],
        unique: true,
    }
})

const Category = mongoose.models.category || mongoose.model("category", CategorySchema);

export default Category;