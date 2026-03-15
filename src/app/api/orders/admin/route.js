import {connectDB} from "@/lib/mongodb"
import Order from "@/models/Order"

export async function GET(){

await connectDB()

const orders = await Order.find().sort({createdAt:-1})

return Response.json(orders)

}

export async function PATCH(req){

await connectDB()

const body = await req.json()

await Order.findByIdAndUpdate(
body.id,
{
paymentStatus:body.paymentStatus,
orderStatus:body.orderStatus
}
)

return Response.json({success:true})

}