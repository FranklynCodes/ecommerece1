import React from "react";

import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

// Recieves the specifications for the input field / Splits up the code
export default function FormInput({ name, label, required }) {
    const { control } = useFormContext();

    return (
        <Grid item xs={12} sm={6}>
            <Controller as={TextField} control={control} fullWidth name={name} label={label} required={required}></Controller>
        </Grid>
    );
}
