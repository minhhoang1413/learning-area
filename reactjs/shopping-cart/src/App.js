import React, { useState } from "react";
import './styles.css'
import Home from "./pages/Home";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import data from './data.json'
function App() {
    const [products, setProducts] = useState(data)
    const [cart, setCart] = useState([])
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    function addToCart(id, amount) {
        if (amount <= 0) {
            return
        }
        const product = products.find(p => p.id === id)
        if (!product) {
            return
        }
        if (amount > product.quantity) {
            amount = product.quantity
        }
        const existingItem = cart.find(c => c.id === id)
        if (existingItem) {
            setCart(cart.map(item => item.id === id ? { ...item, amount: amount } : item))
        } else {
            setCart(cart.concat({ id, amount, name: product.name, image: product.image, price: product.price }))
        }
        setIsSidebarOpen(true)
    }
    function removeItem(id) {
        setCart(cart.filter(item => item.id !== id))
    }
    function checkout() {
        const newProducts = products.map(p => {
            const item = cart.find(item => item.id === p.id)
            if (!item) {
                return p
            }
            return { ...p, quantity: p.quantity - item.amount }
        })
        setProducts(newProducts)
        setCart([])
    }
    function openSidebar() {
        setIsSidebarOpen(true)
    }
    function closeSidebar() {
        setIsSidebarOpen(false)
    }
    return (
        <div className="app">
            <BrowserRouter>
                <Navbar openSidebar={openSidebar} numberOfItems={cart.length} />
                <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={closeSidebar} cart={cart} addToCart={addToCart} removeItem={removeItem} checkout={checkout} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products products={products} />} />
                    <Route path="/products/:id" element={<SingleProduct products={products} addToCart={addToCart} />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App