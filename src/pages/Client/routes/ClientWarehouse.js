import React, { useContext } from 'react';
import { Box, Alert, Typography, ToggleButtonGroup, ToggleButton, Tooltip  } from '@mui/material';
import { useStyles } from '../styles';
import { ClientContext } from '../../../contexts/ClientContext';

import Wearable from '../../../components/Items/Wearable/Wearable';
import Consumable from '../../../components/Items/Consumable/Consumable';

export default function ClientWarehouse() {
    const classes = useStyles();
    const { warehouse, warehouseFilter, sortData } = useContext(ClientContext);

    if(!warehouse.length) {
        return <Alert severity='info' sx={{ display: 'inline-flex' }}>
            No wearables here...
        </Alert>
    }

    return (
        <>
            <Box display='flex' alignItems='center' marginBottom='16px'>
                <Typography variant='subtitle1' sx={{ marginRight: '12px' }}>Sort: </Typography>

                <ToggleButtonGroup
                    value={warehouseFilter}
                    exclusive
                    onChange={(event, value) => sortData(event, value, 'warehouse')}
                    color='primary'
                    aria-label='gotchis sort'
                >
                    <ToggleButton className={classes.filtersButton} value='rarityIdDesc' aria-label='rarity ↓'>
                        <Tooltip title='Rarity ↓' placement='top' followCursor>
                            <Box className={classes.filtersInner} component='span'><span>🔽</span></Box>
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.filtersButton} value='rarityIdAsce' aria-label='rarity ↑'>
                        <Tooltip title='Rarity ↑' placement='top' followCursor>
                            <Box className={classes.filtersInner} component='span'><span>🔼</span></Box>
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.filtersButton} value='balance' aria-label='quantity'>
                        <Tooltip title='Quantity' placement='top' followCursor>
                            <Box className={classes.filtersInner} component='span'><span>*️⃣</span></Box>
                        </Tooltip>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Box className={classes.list}>
                {
                    warehouse.map((item, i)=>{
                        return <div className={classes.listItem} key={i}>
                            {item.category === 2 ? (
                                <Consumable consumable={item} />
                            ) : (
                                <Wearable wearable={item} />
                            )}
                        </div>
                    })
                }
            </Box>
        </>
    );
}