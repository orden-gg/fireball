import React, { useContext } from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton, Tooltip  } from '@mui/material';

import { routersStyles } from '../styles';

import { ClientContext } from '../../../contexts/ClientContext';

import Wearable from '../../../components/Items/Wearable/Wearable';
import Consumable from '../../../components/Items/Consumable/Consumable';
import GhostLoader from '../../../components/GhostLoader/GhostLoader';

export default function ClientWarehouse() {
    const classes = routersStyles();
    const { warehouse, warehouseFilter, loadingGotchis, loadingWarehouse, sortData } = useContext(ClientContext);

    if(loadingWarehouse || loadingGotchis || !warehouse.length) {
        return <Box textAlign='center' paddingTop={'32px'}>
            <GhostLoader
                animate={loadingWarehouse || loadingGotchis || !warehouse.length}
                text={!loadingWarehouse && !loadingGotchis && !warehouse.length ? 'No wearables here :(' : null}
            />
        </Box>
    }

    return (
        <>
            <Box className={classes.sortWrapper}>
                <Typography className={classes.sortText} variant='subtitle1'>Sort: </Typography>

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