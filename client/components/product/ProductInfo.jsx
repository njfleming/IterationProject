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
    Paper,
} from '@material-ui/core';
// import { ArgumentAxis, ValueAxis, LineSeries } from '@devexpress/dx-react-chart-material-ui';
import useStyles from '../../style/theme';

const ProductInfo = ({ productCard, boxData }) => {
    
    const classes = useStyles();

    return (
        <Paper>
            <Typography></Typography>
            {/* <Chart data={data} >
                <ArgumentAxis />
                <ValueAxis />
                <LineSeries argumentField="date" valueField="price" />
            </Chart> */}

        </Paper>

    )
}

export default ProductInfo

