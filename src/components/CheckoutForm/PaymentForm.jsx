import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Review from "./Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export default function PaymentForm({ checkoutToken, shippingData, backStep, onCaptureCheckout, nextStep }) {
    const handleSumbit = async (event, elements, stripe) => {
        event.preventDefault();

        if (stripe === null || elements === null) {
            return;
        }
        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card: cardElement });

        if (error) {
            console.log(error);
        } else {
            // Finalized Order Data, Location AddressForm.jsx input
            const orderData = {
                line_items: checkoutToken.live.line_items,
                customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
                shipping: {
                    name: "Primary",
                    street: shippingData.address1,
                    town_city: shippingData.city,
                    county_state: shippingData.shippingSubdivision,
                    postal_zip_code: shippingData.zip,
                    country: shippingData.shippingCountry,
                },
                fulfillment: { shipping_method: shippingData.shippingOption },
                payment: {
                    gateway: "stripe",
                    stripe: {
                        // paymentMethod, created in stripe await above
                        payment_method_id: paymentMethod.id,
                    },
                },
            };
            // OnCaptureCheckout captures the order data when checkout is finished and sends it back up the components to then be async/awaited until respone to then use that output to develop our reference number
            
            // Our order data then overwrites the return object from the handleCaptureCheckout function call 
            onCaptureCheckout(checkoutToken.id, orderData);

            nextStep();
        }
    };

    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
                Payment Method
            </Typography>
            <Elements stripe={stripePromise}>
                {/* Stripe Doc for stripe elements */}
                {/* Call back Function / Test - Change parentheses to brackets */}
                <ElementsConsumer>
                    {({ elements, stripe }) => (
                        <form onSubmit={(e) => handleSumbit(e, elements, stripe)}>
                            <CardElement></CardElement>
                            <br /> <br />
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Button variant="outlined" onClick={backStep}>
                                    Back
                                </Button>
                                <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                    )}
                </ElementsConsumer>
            </Elements>
        </>
    );
}
