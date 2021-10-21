import React from 'react';
import { Box, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { useStyles } from '../styles';

import commonUtils from '../../../utils/commonUtils';
import Wearable from '../../../components/Wearable/Wearable';

export default function ClientWarehouse({warehouse, warehouseFilter, setWarehouseFilter, setWarehouse}) {
    const classes = useStyles();

    const onWarehouseSort = (event) => {
        setWarehouse(commonUtils.basicSort(
            warehouse,
            event.target.value === 'balance' ? 'balance' : 'rarityId',
            event.target.value === 'balance' ? 'desc' : event.target.value)
        );
        setWarehouseFilter(event.target.value);
    };

    return (
        <>
            <Box maxWidth={300} marginBottom='20px'>
                <FormControl variant='outlined' size='small' className={classes.formControl} fullWidth>
                    <InputLabel>Order by:</InputLabel>
                    <Select
                        label='Order by:'
                        value={warehouseFilter}
                        onChange={onWarehouseSort}
                    >
                        <MenuItem value='desc'>Rarity (godlike {'->'} common)</MenuItem>
                        <MenuItem value='asc'>Rarity (common {'->'} godlike)</MenuItem>
                        <MenuItem value='balance'>Quantity</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box className={classes.list}>
                {
                    warehouse.map((item, i)=>{
                        return <div className={classes.listItem} key={i}>
                            <Wearable wearable={item} />
                        </div>
                    })
                }
            </Box>
        </>
    );
}