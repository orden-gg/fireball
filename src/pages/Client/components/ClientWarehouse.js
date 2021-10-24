import React from 'react';
import { Box, Alert, Link, Typography, ToggleButtonGroup, ToggleButton, Tooltip  } from '@mui/material';
import { useStyles } from '../styles';

import commonUtils from '../../../utils/commonUtils';
import Wearable from '../../../components/Items/Wearable/Wearable';
import Consumable from '../../../components/Items/Consumable/Consumable';

export default function ClientWarehouse({warehouse, warehouseFilter, setWarehouseFilter, setWarehouse}) {
    const classes = useStyles();

    const onSort = (event, newFilter) => {
        setWarehouse(commonUtils.basicSort(
            warehouse,
            newFilter === 'balance' ? 'balance' : 'rarityId',
            newFilter === 'balance' ? 'desc' : newFilter)
        );
        setWarehouseFilter(newFilter);
    };

    if(!warehouse.length) {
        return <Alert severity='info' sx={{ display: 'inline-flex' }}>
            No wearables here... <Link
                href='https://www.aavegotchi.com/baazaar/wearables?sort=latest'
                target='_blank'
                underline='hover'
                style={{ color: 'red' }}
            >
                [Baazaar listings]
            </Link>
        </Alert>
    }

    return (
        <>
            <Box display='flex' alignItems='center' marginBottom='20px'>
                <Typography variant='subtitle1' sx={{ marginRight: '12px' }}>Sort: </Typography>

                <ToggleButtonGroup
                    value={warehouseFilter}
                    exclusive
                    onChange={onSort}
                    color='primary'
                    aria-label='gotchis sort'
                >
                    <ToggleButton className={classes.filtersButton} value='desc' aria-label='modified rarity score'>
                        <Tooltip title='Rarity ↓' placement='top' followCursor>
                            <Box className={classes.filtersInner} component='span'><span>🔽</span></Box>
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.filtersButton} value='asc' aria-label='base rarity score'>
                        <Tooltip title='Rarity ↑' placement='top' followCursor>
                            <Box className={classes.filtersInner} component='span'><span>🔼</span></Box>
                        </Tooltip>
                    </ToggleButton>
                    <ToggleButton className={classes.filtersButton} value='balance' aria-label='kinship'>
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