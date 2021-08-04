/**
 * Stores the data using useState and passes it down the the components children
 * Receives promise from Commerece.js API that contains the data.products
 * Maninuplates the data using State
 */

import React, { useState, useEffect } from "react";
import { NavBar, Products, Cart, Checkout } from "./components";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
        setCart(await commerce.cart.retrieve());
        // setCart(await commerce.cart.retrieve()) // doesn't create a variable
    };

    // Adds the product key and how the quanitity your adding to cart
    const handleAddToCart = async (productId, quantity) => {
        // destructing the cart imedeitly because it has been destructed from the response object
        const { cart } = await commerce.cart.add(productId, quantity);
        setCart(cart);
        // const response = await commerce.cart.add(productId, quantity);
        // setCart(respone.cart)
    };

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });
        setCart(cart);
    };

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        setCart(cart);
    };

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        setCart(cart);
    };

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    // console.log("products:", products);
    // console.log("cart:", cart);

    return (
        <Router>
            <div>
                <NavBar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart}></Products>
                    </Route>
                    <Route exact path="/cart">
                        <Cart
                            cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>
                    <Route exact path="/checkout">
                        {/* Cart is passed down to child component as a prop in order to  */}
                        <Checkout cart={cart}></Checkout>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
// Calcback function so that it doesn't call itself imedietly
// Pass in the id of the product
// UseEffect - is used to fetch products imediitly on application load
