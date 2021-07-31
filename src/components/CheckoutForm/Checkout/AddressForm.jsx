import React from "react";
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
// import CustomFormInput from "./";

import FormInput from "./CustomTextField";

import { commerce } from "../../../lib/commerce";


// Connecting ReactHooks to MaterialUI text input
export default function AddressForm() {
    // Create State varibles to store commerece api variables 
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')

    
    const methods = useForm();

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
                        <Grid item xs={12} sm = {6}>
                            <InputLabel>Shipping Country </InputLabel>
                            <Select value={""} fullWidth onChange={}>
                                <MenuItem key={} value={}>
                                    Select Me 
                                </MenuItem>                                
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm = {6}>
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
                        </Grid>

                    </Grid>
                </form>
            </FormProvider>
        </>
    );
}
