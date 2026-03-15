"use client"

import {useState} from "react"
import axios from "axios"
import {useRouter} from "next/navigation"

export default function AdminLogin(){

const router = useRouter()

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const login = async()=>{

const res = await axios.post("/api/admin/login",{
email,
password
})

if(res.data.success){

localStorage.setItem("adminToken",res.data.token)

router.push("/admin/orders")

}else{

alert(res.data.message)

}

}

return(

<div className="container mt-5">

<h2>Admin Login</h2>

<input
className="form-control mb-3"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
className="form-control mb-3"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="btn btn-primary"
onClick={login}
>

Login

</button>

</div>

)

}