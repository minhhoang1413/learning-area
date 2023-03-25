import React from "react";

function Sidebar({ cart, isSidebarOpen, closeSidebar, addToCart, removeItem, checkout }) {
    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.amount
    }, 0)
    return (
        <aside className={isSidebarOpen ? 'sidebar open' : 'sidebar'}>
            <button className="close-btn" onClick={closeSidebar}>x</button>
            <h3 className="center">Cart</h3>
            {
                cart.map(item => (
                    <div className="sidebar-item" key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <div>
                            <p>{item.name}</p>
                            <p>{item.price}$</p>
                            <div className="group-change-amount">
                                <button disabled={item.amount === 1} onClick={() => addToCart(item.id, item.amount - 1)}>-</button>
                                <input type="number" value={item.amount} onChange={(e) => addToCart(item.id, Number(e.target.value))} />
                                <button onClick={() => addToCart(item.id, item.amount + 1)}>+</button>
                            </div>
                            <div>
                                <button onClick={() => removeItem(item.id)}>remove item</button>
                            </div>
                        </div>
                    </div>
                ))
            }
            <p className="center">total : {total}$</p>
            <div className="center">
                <button onClick={checkout}>check out</button>
            </div>
        </aside>
    )
}

export default Sidebar