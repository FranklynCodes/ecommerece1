/**
 * Stores the data using useState and passes it down the the components children
 * Receives promise from Commerece.js API that contains the data.products
 * Maninuplates the data using State
 */

import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, NavBar } from "./components";

export default function App() {
    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState({});

    //  Fetch the Products on load
    const fetchProducts = async () => {
        // commerce.products.list() returns a promise and you have to await it to   see what is inside
        const { data } = await commerce.products.list();
        // When data is recived you can now destructure/formate the data from the api
        setProducts(data); // Pupulates the state with our products
    };

    const fetchCart = async () => {
        // api call to recieve respone of commerce.cart.retrieve()

        const cart = await commerce.cart.retrieve();
        setCart(cart);
        // setCart(await commerce.cart.retrieve()) // doesn't create a variable
    };

    // Adds the product key and how the quanitity your adding to cart
    const handleAddToCart = async (productId, quanitity) => {
        const item = await commerce.cart.add(productId, quanitity);

        setCart(item.cart);
    };

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log("products:", products);
    console.log("cart:", cart);

    return (
        <div id="App">
            <NavBar totalItems = {cart.total_items}/>
            <Products products={products} onAddToCart={handleAddToCart}></Products>
        </div>
    );
}
// Calcback function so that it doesn't call itself imedietly
// Pass in the id of the product
// UseEffect - is used to fetch products imediitly on application load
