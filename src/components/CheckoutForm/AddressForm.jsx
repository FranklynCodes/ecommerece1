import React, { useState, useEffect } from "react";
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";

import { commerce } from "../../lib/commerce";
import FormInput from "./CustomTextField";

// import { Checkout } from "@chec/commerce.js/features/checkout";

// Connecting ReactHooks to MaterialUI text input
export default function AddressForm({ checkoutToken, next }) {
    // var temp = checkoutToken.id;
    // console.log("checkoutToken:", checkoutToken);
    // console.log("checkoutToken.id:", checkoutToken.id);

    // Create State varibles to store commerece api variables
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState("");
    const methods = useForm();

    // Object must be typecasted in a useState EMPTY ARRAY
    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));

    const subdivisons = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }));

    const options = shippingOptions.map((shippingO) => ({
        id: shippingO.id,
        label: `${shippingO.description} - (${shippingO.price.formatted_with_symbol})`,
    }));

    // console.log("countries:", shippingOptions); // !

    // Recipe ID = checkoutTokenId
    // console.log('checkoutTokenId:', checkoutToken)
    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        // console.log("countries:", countries); // !
        setShippingCountries(countries);
        // countries is a object, so we cannot access it normally like a array, and we can't use keys individually, want it to dynamically update

        setShippingCountry(Object.keys(countries)[0]);
    };

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]); // Inital Starting Point for keys of object, Base Case 0
    };

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });

        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    // One dependency, whenever shippingCountry changes then we need to call what is inside the useEffect, fetchSubdivisions()
    // After display select field based on select field
    // ? When to use, useEffect multiple times? When does it make sense to?
    useEffect(() => {
        // ! Its okay using multiple useEffects as long as its nessecaaary
        // if shippingCountry exists then run fetchSubdivision method
        if (shippingCountry) {
            fetchSubdivisions(shippingCountry);
        }
    }, [shippingCountry]);

    useEffect(() => {
        if (shippingSubdivision) {
            fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
        }
    }, [shippingSubdivision]);

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>
            {/* Destructing the methods from useForm Lib */}
            <FormProvider {...methods}>
                {/* Data object contains everything below  */}
                <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }))}>
                    <Grid container spacing={3}>
                        {/* Data and Grid Data Two different data, that you need to manipulate with object manipulation */}
                        <FormInput required name="firstName" label="First name"></FormInput>
                        <FormInput required name="lastName" label="Last name"></FormInput>
                        <FormInput required name="address1" label="Address"></FormInput>
                        <FormInput required name="email" label="Email"></FormInput>
                        <FormInput required name="city" label="City"></FormInput>
                        <FormInput required name="zip" label="Zip / Postal code"></FormInput>
                        {/* Wrap this Grid  */}
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {/* Below is a array of arrays  */}
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {/* Below is a array of arrays  */}
                                {subdivisons.map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id}>
                                        {subdivision.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options </InputLabel>
                            <Select
                                value={shippingOption}
                                fullWidth
                                onChange={(e) => {
                                    setShippingOption(e.target.value);
                                }}
                            >
                                {options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button component={Link} to="/cart" variant="outlined">
                            Back to Cart
                        </Button>
                        <Button type="sumbit" variant="contained" color="primary">
                            Next
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}
