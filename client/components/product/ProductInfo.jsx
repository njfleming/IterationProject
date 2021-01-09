import React from 'react';
import {
	Grid,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	ButtonBase,
} from '@material-ui/core';
import useStyles from '../../style/theme';

const ProductInfo = ({ productCard }) => {


    return {
        <Card 
            // className={`${classes.productCard}+info`}
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <CardActionArea style={{ height: 300 }}>
                <CardMedia
                    className={classes.productCardMedia}
                    image={imageUrl}
                    title={productName}
                />
            </CardActionArea>
        </Card>
    }
}

export default ProductInfo

