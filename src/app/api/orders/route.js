import {connectDB} from "@/lib/mongodb"
import Order from "@/models/Order"

export async function POST(req){

await connectDB()

const body = await req.json()

const order = await Order.create(body)

return Response.json({
success:true,
order
})

}