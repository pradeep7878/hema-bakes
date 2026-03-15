import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({

customerName:String,

phone:String,

address:String,

items:Array,

total:Number,

paymentMethod:String,

paymentStatus:{
type:String,
default:"Pending Verification"
},

orderStatus:{
type:String,
default:"Pending"
},

createdAt:{
type:Date,
default:Date.now
}

})

export default mongoose.models.Order ||
mongoose.model("Order",OrderSchema)