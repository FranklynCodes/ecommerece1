import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();

    // ! Becareful using parentheses vs brackets for arrow functions
    const EmptyCart = () => (
        <Typography variant="subtitle1">
            You have no items in your shopping cart, start adding some!
            <Link to="/" className={classes.link}>
                Start Adding Some
            </Link>
            !
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {/* instenanous fnc */}
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        {/* // ! Refactor handleUpdateCart... to onUpdateCart...  */}
                        <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} />
                        {/* <div>{item.name}</div> */}
                    </Grid>
                ))}
            </Grid>

            <div className={classes.cardDetails}>
                <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} onClick={handleEmptyCart} size="large" type="button" variant="contained" color="secondary">
                        Empty Cart
                    </Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">
                        Checkout
                    </Button>
                </div>
            </div>
        </>
    );

    if (!cart.line_items) return "Loading...";

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant="h3" gutterBottom>
                Your Shopping Cart
            </Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    );
};

export default Cart;
