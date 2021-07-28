import React from "react";
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

import logo from "../../assets/gem.png";

import useStyles from "./styles";

export default function Navbar() {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className="classes.title" color="inherit">
                        <img src={logo} alt="Commere Site" height="25px" className={classes.image} />
                        Gem Store
                    </Typography>
                    {/* classes.grow takes up remaining space */}
                    <div className={classes.grow}></div>
                    <div className={classes.button}>
                        <IconButton aria-label="Show Cart Items" color="inherit">
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCart></ShoppingCart>
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
