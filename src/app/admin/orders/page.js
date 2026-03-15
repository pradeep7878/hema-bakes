"use client"

import {useEffect,useState} from "react"
import axios from "axios"
import {useRouter} from "next/navigation"

export default function AdminOrders(){

const router = useRouter()

const [orders,setOrders] = useState([])

useEffect(()=>{

const token = localStorage.getItem("adminToken")

if(!token){

router.push("/admin/login")

}

loadOrders()

},[])

const loadOrders = async()=>{

const res = await axios.get("/api/orders/admin")

setOrders(res.data)

}

const updateOrder = async(id)=>{

await axios.patch("/api/orders/admin",{
id,
paymentStatus:"Verified",
orderStatus:"Preparing"
})

loadOrders()

}

return(

<div className="container mt-5">

<h2>HEMA BAKES - Admin Orders</h2>

<table className="table mt-4">

<thead>

<tr>

<th>Customer</th>
<th>Total</th>
<th>Payment</th>
<th>Status</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{orders.map((o)=>(
<tr key={o._id}>

<td>{o.customerName}</td>

<td>₹{o.total}</td>

<td>{o.paymentStatus}</td>

<td>{o.orderStatus}</td>

<td>

<button
className="btn btn-success btn-sm"
onClick={()=>updateOrder(o._id)}
>

Verify Payment

</button>

</td>

</tr>
))}

</tbody>

</table>

</div>

)

}