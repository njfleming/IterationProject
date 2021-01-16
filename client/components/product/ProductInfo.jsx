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
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
  } from '@devexpress/dx-react-chart';
import useStyles from '../../style/theme';

const ProductInfo = ({ productCard, boxData }) => {
    
    const classes = useStyles();
    // const history = boxData.map(({ lowest_daily_price, timestamp }) => {
    //     return { date: timestamp, price: lowest_daily_price}
    // })

    // console.log("boxData in product  info: " + boxData)
    console.log("history obj " + history)

    return (
        <Paper>
            <Typography>hi</Typography>
            <Chart data={boxData} >
                <ArgumentAxis />
                <ValueAxis />
                <LineSeries argumentField="timestamp" valueField="lowest_daily_price" />
            </Chart>

        </Paper>

    )
}

export default ProductInfo

