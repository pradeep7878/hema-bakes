import mongoose from "mongoose"

export const connectDB = async () => {

if(mongoose.connection.readyState) return

await mongoose.connect("mongodb://127.0.0.1:27017/hema_bakes")

console.log("MongoDB Connected")

}