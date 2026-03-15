import ProductCard from "@/components/ProductCard"
import products from "@/data.json"

export default async function Home(){

return(

<div>

<section className="hero container mt-4 mb-5 reveal">
<div className="row align-items-center g-4">
<div className="col-md-7">
<p className="hero-eyebrow">Small-batch • Freshly baked</p>
<h1 className="hero-title">Elegant brownies, made in India</h1>
<p className="hero-subtitle">
Rich cocoa, slow-baked centers, and curated flavors for every craving.
</p>
<div className="d-flex gap-3 mt-3">
<a className="btn btn-primary" href="#menu">Explore Menu</a>
<a className="btn btn-outline-dark" href="/cart">View Cart</a>
</div>
</div>
<div className="col-md-5">
<div className="hero-image-wrap">
<img
src="https://images.pexels.com/photos/33674421/pexels-photo-33674421.jpeg?auto=compress&cs=tinysrgb&w=1200"
alt="Brownies"
className="img-fluid rounded-4 hero-image"
/>
</div>
</div>
</div>
</section>

<div className="container mt-5">

<h1 id="menu" className="text-center mb-5 reveal">

Fresh Homemade Brownies

</h1>

<div className="row">

{products.map((p,i)=>(
<div className="col-md-3 mb-4" key={p._id ?? i}>

<ProductCard product={p} style={{animationDelay:`${i * 60}ms`}}/>

</div>
))}

</div>

</div>

</div>

)

}
