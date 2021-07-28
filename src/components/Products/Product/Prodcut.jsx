// Layout for one specific product
// Child of Products.jsx
import React from "react";
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";

import useStyles from "./styles";

// Destructing passed in values
const Prodcut = ({ product }) => {
    const classes = useStyles();

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
                    <IconButton aria-label="Add to Card">
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
