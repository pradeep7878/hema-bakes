"use client"

import {useState} from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default function Login(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const login = async()=>{

try{
await axios.post("/api/auth/login",{
email,
password
})

toast.success("Login success")
}catch(err){
toast.error("Login failed")
}

}

return(

<div className="container mt-5">

<h2>Login</h2>

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
onClick={login}
className="btn btn-primary">

Login

</button>

</div>

)

}
