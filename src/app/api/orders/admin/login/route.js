import {connectDB} from "@/lib/mongodb"
import User from "@/models/User"
import jwt from "jsonwebtoken"

export async function POST(req){

await connectDB()

const body = await req.json()

const user = await User.findOne({
email:body.email
})

if(!user){

return Response.json({
success:false,
message:"User not found"
})

}

if(user.password !== body.password){

return Response.json({
success:false,
message:"Invalid password"
})

}

if(user.role !== "admin"){

return Response.json({
success:false,
message:"Not authorized"
})

}

const token = jwt.sign(
{ id:user._id , role:user.role },
"hema_secret",
{expiresIn:"1d"}
)

return Response.json({
success:true,
token
})

}