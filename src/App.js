import React, { useState, useEffect } from "react";

import { commerce } from "./lib/commerce";
import { Products, NavBar } from "./components";

export default function App() {
    const [products, setProducts] = useState([]);

    //  Fetch the Products on load
    const fetchProducts = async () => {
        // commerce.products.list() returns a promise and you have to await it to   see what is inside
        const { data } = await commerce.products.list();
        // When data is recived you can now destructure/formate the data from the api
        setProducts(data); // Pupulates the state with our products
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    console.log("products:", products);

    return (
        <div id="App">
            <NavBar />
            <Products products={products}></Products>
        </div>
    );
}

// UseEffect - is used to fetch products imediitly on application load
