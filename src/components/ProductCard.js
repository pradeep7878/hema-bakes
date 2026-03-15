import Link from "next/link"

export default function ProductCard({product, style}){

return(

<div className="card p-3 shadow product-card reveal" style={style}>

<img
src={product.image}
className="img-fluid rounded product-card-image"
alt={product.name}
/>

<div className="product-card-body">
<div className="product-card-meta">
<span className="product-card-category">{product.category}</span>
<span className="product-card-rating">★ {product.rating}</span>
</div>

<h5 className="mt-2 product-card-title">{product.name}</h5>

<div className="product-card-footer">
<p className="mb-0 product-card-price">₹{product.price}</p>
<Link
href={`/product/${product._id}`}
className="btn btn-primary btn-sm">
View
</Link>
</div>
</div>

</div>

)

}
