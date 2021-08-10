import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Review from "./Review";

export default function PaymentForm(checkoutToken) {
    var temp = checkoutToken.live;
    
    return (
        <>
            <Review checkoutToken={checkoutToken} checkoutTokenLive={temp}/>
        </>
    );
}
