import React from "react";

import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

// Recieves the specifications for the input field / Splits up the code
export default function FormInput({ name, label, required }) {
    const { control } = useFormContext();

    return (
        <Grid item xs={12} sm={6}>
            <Controller control={control} name={name} render={({ field }) => <TextField fullWidth label={label} required />}></Controller>
        </Grid>
    );
}
