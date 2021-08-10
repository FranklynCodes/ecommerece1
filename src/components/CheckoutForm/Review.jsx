import React from "react";

import { useEffect } from "react";

import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

const Review = (checkoutToken) => {

    // useEffect(() => {
    //     // GenerateToken method requires Card ID, and type of Token

    //     if (checkoutToken.live === undefined) {
    //         const generateCheckoutTokenAgain = async () => {
    //             try {
    //                 const token = await commerce.checkout.generateToken(cart.id, { type: "cart" });
    //                 console.log("token:", token);
    //                 console.log("token:", token.cart_id);
    //                 setCheckoutToken(token);
    //             } catch (error) {}
    //         };
    //         generateCheckoutTokenAgain();
    //     }
    // }, []);

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Order Summary
            </Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map((product) => {
                    <ListItem style={{ padding: "10px 0px" }} key={product.name}>
                        <ListItemText primary={product.name} secondary={`Quanity: ${product.quanity}`}></ListItemText>
                        <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
                    </ListItem>;
                })}
                <listItem style={{ padding: "10px 0" }}>
                    <ListItemText primary="Total">
                        <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
                            {checkoutToken.live.subtotal.formatted_with_symbol}
                        </Typography>
                    </ListItemText>
                </listItem>
            </List>
        </div>
    );
};

export default Review;
