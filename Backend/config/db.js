import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://krishnagupta2022:WbWbJKrFqGFwTHXA@cluster0.7yy4s.mongodb.net/food-del').then(() => console.log("DB connected"))
}