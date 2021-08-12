import React, { useState, useEffect } from "react";
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from "@material-ui/core";

import { commerce } from "../../../lib/commerce";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import useStyles from "./styles";
import { Link, useHistory } from "react-router-dom";

const steps = ["Shipping Address", "Payment Details"];

export default function Checkout({ cart, order, onCaptureCheckout, error }) {
    const [checkoutToken, setCheckoutToken] = useState(null); // maybe
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({}); // Data that is being passed in from addressForm
    const [isFinished, setIsFinished] = useState(false);

    const classes = useStyles();
    const history = useHistory();

    // Initally component did mount, only happens once at the start
    // ! useEffect does not allow the use of async unless its a new function
    useEffect(() => {
        // GenerateToken method requires Card ID, and type of Token
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: "cart" });
                console.log("token:", token);
                setCheckoutToken(token);
            } catch (error) {
                // Error occurs when you actually do the order but then refresh the page Commerce.js will not be able togenerate a token because the cart is empty
                history.push("/");
                console.log("Checkout Error Details", error);
            }
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

    // Demonstrating Demo Time Out | Passed into Payments Form
    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true);
        }, 3000);
    };

    let Confirmation = () =>
        // If order Customer exists then load block, if not load spinner
        order.customer ? (
            <>
                <div>
                    <Typography variant="h5">
                        Thank you for your purchase, {order.customer.firstname} - {order.customer.lastname}
                    </Typography>
                    <Divider className={classes.divider}></Divider>
                    <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
                </div>
                <br />
                <Button component={Link} to="/" variant="outlined" type="button">
                    Back to Home
                </Button>
            </>
        ) : // or is finished show parentes if its not show outer parentheses
        isFinished ? (
            <>
                <div>
                    <Typography variant="h5">Thank you for your purchase! </Typography>
                    {/* <Typography variant="h5">Thank you for your purchase! order_customer_firstname - order_customer_lastname</Typography> */}
                    <Divider className={classes.divider}></Divider>
                    {/* <Typography variant="subtitle2">Order ref: order_customer_reference</Typography> */}
                </div>
                <br />
                <Button component={Link} to="/" variant="outlined" type="button">
                    Back to Home
                </Button>
            </>
        ) : (
            <div className={classes.spinner}>
                <CircularProgress></CircularProgress>
            </div>
        );

    if (error) {
        <>
            <Typography variant="h5">Error:{error}</Typography>
            <br />
            <Button component={Link} to="/" variant="outlined" type="button">
                Back to Home
            </Button>
        </>;
    }
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
                timeout={timeout}
            />
        );

    return (
        <>
            <CssBaseline />
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
