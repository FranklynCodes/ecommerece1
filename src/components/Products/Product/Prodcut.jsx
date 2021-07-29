// Layout for one specific product
// Contains all the styling for the actual card itself
// Child of Products.jsx
import React from "react";
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

import useStyles from "./styles";

// Destructing passed in values
const Prodcut = ({ product, onAddToCart }) => {
    const classes = useStyles();
    const numOfItemsToAdd = 1;

    return (
        <div>
            <Card className={classes.root}>
                <CardMedia className={classes.media} image={product.media.source} title={product.name}></CardMedia>
                <CardContent>
                    <div className={classes.cardContent}>
                        <Typography variant="h5" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="h5">{product.price.formatted_with_symbol}</Typography>
                    </div>
                    <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary"></Typography>
                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                    {/* onClick Callback function so that it doesn't call itself imedietly  */}
                    {/* Pass in the id of the product  */}
                    <IconButton aria-label="Add to Card" onClick={() => onAddToCart(product.id, numOfItemsToAdd)}>
                        <AddShoppingCart></AddShoppingCart>
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    );
};

export default Prodcut;

/** Notes
 * When passing in props you have to basically create the paramater to trully pass it in similar to C++
 *
 */
