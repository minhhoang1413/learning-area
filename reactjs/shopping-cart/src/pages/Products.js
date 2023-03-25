import React from "react";
import { Link } from "react-router-dom";
function Products({ products }) {

    return (
        <section className="products">
            {products.map(product => (
                <Link className="product" key={product.id} to={`/products/${product.id}`}>
                    <img src={product.image} alt={product.name} />
                    <p className="title">{product.name}</p>
                    <p>{product.price}$</p>
                    {product.quantity === 0 && <p className="out-of-stock">Out of stock</p>}
                </Link>
            ))}
        </section>
    )
}

export default Products