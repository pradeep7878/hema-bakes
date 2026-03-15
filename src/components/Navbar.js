"use client"

import Link from "next/link"
import {FaShoppingCart} from "react-icons/fa"

export default function Navbar(){

return(

<nav className="navbar px-4 py-3">

<div className="container-fluid">

<Link href="/" className="navbar-brand text-warning fw-bold brand-font">

HEMA BAKES

</Link>

<div className="d-flex gap-4">

<Link href="/">Home</Link>

<Link href="/cart">
<FaShoppingCart size={22}/>
</Link>

<Link href="/login" className="btn btn-warning">
Login
</Link>

</div>

</div>

</nav>

)

}
