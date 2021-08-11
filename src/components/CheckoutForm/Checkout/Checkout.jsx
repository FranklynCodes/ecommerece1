import React, { useState, useEffect } from "react";
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from "@material-ui/core";

import { commerce } from "../../../lib/commerce";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import useStyles from "./styles";

const steps = ["Shipping Address", "Payment Details"];

export default function Checkout({ cart, order, onCaptureCheckout, error }) {
    const [checkoutToken, setCheckoutToken] = useState(null); // maybe
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({}); // Data that is being passed in from addressForm
    const classes = useStyles();

    // Initally component did mount, only happens once at the start
    // ! useEffect does not allow the use of async unless its a new function
    useEffect(() => {
        // GenerateToken method requires Card ID, and type of Token
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: "cart" });
                console.log("token:", token);
                setCheckoutToken(token);
            } catch (error) {}
        };
        generateToken();
    }, [cart]);

    // When your settinig the state with react using a previous state you need to use a callback function

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    // shippingData
    const next = (data) => {
        setShippingData(data);
        nextStep();
    };

    const Confirmation = () => <div>Confirmation</div>;
    // Passing in checkoutToken as a prop to addressForm
    // ? Possibily could be async, to avoid checkoutToken issue not applying at the correct order of run time, However the respone l get from the api is already declared as async in useEffect of This FIle
    console.log("Checkout\tFile\tcheckoutTokenTOBJECT:", checkoutToken);
    const Form = () =>
        activeStep === 0 ? (
            <AddressForm checkoutToken={checkoutToken} next={next} />
        ) : (
            <PaymentForm
                shippingData={shippingData}
                checkoutToken={checkoutToken}
                nextStep={nextStep}
                backStep={backStep}
                onCaptureCheckout={onCaptureCheckout}
            />
        );

    return (
        <>
            <div className={classes.toolbar}></div>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    );
}
