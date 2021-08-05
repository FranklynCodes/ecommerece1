import React, { useState, useEffect } from "react";
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";

import { commerce } from "../../lib/commerce";
import FormInput from "./CustomTextField";

// import { Checkout } from "@chec/commerce.js/features/checkout";

// Connecting ReactHooks to MaterialUI text input
export default function AddressForm({ checkoutToken }) {
    console.log("checkoutToken:", checkoutToken);
    console.log("checkoutToken.id:", checkoutToken.id);
    // Create State varibles to store commerece api variables
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState("");
    const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));
    console.log("countries:", countries);

    // Recipe ID = checkoutTokenId
    // console.log('checkoutTokenId:', checkoutToken)
    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        console.log("countries:", countries);
        setShippingCountries(countries);
        // countries is a object, so we cannot access it normally like a array, and we can't use keys individually, want it to dynamically update

        setShippingCountry(Object.keys(countries)[0]);
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>
            {/* Destructing the methods from useForm Lib */}
            <FormProvider {...methods}>
                <form onSubmit="">
                    <Grid container spacing={3}>
                        <FormInput require name="firstName" label="First name"></FormInput>
                        <FormInput require name="lastName" label="Last name"></FormInput>
                        <FormInput require name="address1" label="Address"></FormInput>
                        <FormInput require name="email" label="Email"></FormInput>
                        <FormInput require name="city" label="City"></FormInput>
                        <FormInput require name="zip" label="Zip / Postal code"></FormInput>
                        {/* Wrap this Grid  */}
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country </InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {/* Below is a array of arrays  */}
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        {/* <Grid item xs={12} sm = {6}>
                            <InputLabel>Shipping Subdivision </InputLabel>
                            <Select value={""} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select Me 
                                </MenuItem>                                
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm = {6}>
                            <InputLabel>Shipping Options </InputLabel>
                            <Select value={""} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select Me 
                                </MenuItem>                                
                            </Select>
                        </Grid> */}
                    </Grid>
                </form>
            </FormProvider>
        </>
    );
}
