// Used to create the layout of the website ie nav bar and grid layout
// Retrives data from the commerence.js site and passses it 
// Creates the wireframe for the recieved data 

import React from "react";
import { Grid } from "@material-ui/core";

import Product from "./Product/Prodcut";
import useStyles from "./styles";

/**
 * Each time your looping through something in jsx you need to have a key attached to it
 * xs means its going to take full width on moblie devices
 * sm means it will take 6 spaces out of 12
 *
 * @returns
 */
// need to Pass down the products variable down the scope to the "product.js" file
export default function Products({ products, onAddToCart }) {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            {/*.toolbar pushses content below depending on nav height  */}
            <div className={classes.toolbar} />

            <Grid container justifyContent="center" spacing={4}>
                {/* Products array maps itself to prodcut var */}
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart}></Product>
                    </Grid>
                ))}
            </Grid>
        </main>
    );
}
