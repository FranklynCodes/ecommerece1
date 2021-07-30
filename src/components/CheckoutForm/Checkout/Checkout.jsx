import React, { useState } from "react";
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from "@material-ui/core";

import useStyles from "./styles";

const steps = ["Shipping Address", "Payment Details"];
export default function Checkout() {
    const classes = useStyles();
    const [ActiveStep, setActiveStep] = useState(0);

    return (
        <>
            <div className={classes.toolbar}></div>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={0} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Paper>
            </main>
        </>
    );
}
