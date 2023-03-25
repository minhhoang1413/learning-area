import React, { useState } from "react";
import { useParams } from "react-router-dom";

function SingleProduct({ products, addToCart }) {
    const { id } = useParams()
    const [amount, setAmount] = useState(1)
    function changeAmount(number) {
        number = Number(number)
        if (isNaN(number) || number < 0) {
            return
        }
        if (number > product.quantity) {
            number = product.quantity
        }
        setAmount(number)
    }
    const product = products.find(p => p.id === id)
    const { image, name, price, quantity } = product
    return (
        <section className="product-detail">
            <img src={image} alt={name} />
            <div>
                <h1 className="title">{name}</h1>
                <p>Price: {price}$</p>
                <p>Quantity: {quantity}</p>
                {quantity === 0 && <p className="out-of-stock">Out of stock</p>}
                <div className="group-change-amount">
                    <button disabled={amount <= 1} onClick={() => changeAmount(amount - 1)}>-</button>
                    <input type="number" value={amount} onChange={e => changeAmount(e.target.value)} />
                    <button disabled={amount >= quantity} onClick={() => changeAmount(amount + 1)}>+</button>
                </div>
                <div>
                    <button className="button" disabled={amount <= 0 || amount > quantity} onClick={() => addToCart(id, amount)}>Add to card</button>
                </div>

            </div>
        </section>
    )
}

export default SingleProduct