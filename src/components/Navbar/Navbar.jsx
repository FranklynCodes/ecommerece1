import React from "react";
import { AppBar, Toolbar, IconButton, Badge, Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";

import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/gem.png";

import useStyles from "./styles";

export default function Navbar({ totalItems }) {
    const classes = useStyles();
    const location = useLocation();

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className="classes.title" color="inherit">
                        <img src={logo} alt="Commere Site" height="25px" className={classes.image} />
                        PlaceHolder Store
                    </Typography>
                    {/* classes.grow takes up remaining space */}
                    <div className={classes.grow}></div>
                    {location.pathname === "/" && (
                        <div className={classes.button}>
                            {/* <Link to="/cart">Go To Cart</Link> */}
                            {/* Link syntax */}
                            <IconButton component={Link} to="/cart" aria-label="Show Cart Items" color="inherit">
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart></ShoppingCart>
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
