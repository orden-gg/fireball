import React from 'react';
import { Box, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { useStyles } from '../styles';

import commonUtils from '../../../utils/commonUtils';
import Gotchi from '../../../components/Gotchi/Gotchi';

export default function ClientGotchis({gotchis, gotchisFilter, setGotchisFilter, setGotchis}) {
    const classes = useStyles();

    const onGotchisSort = (event) => {
        setGotchis(commonUtils.basicSort(gotchis, event.target.value));
        setGotchisFilter(event.target.value);
    };

    return (
        <>
            <Box maxWidth={300} marginBottom='20px'>
                <FormControl variant='outlined' size='small' className={classes.formControl} fullWidth>
                    <InputLabel>Order by:</InputLabel>
                    <Select
                        label='Order by:'
                        value={gotchisFilter}
                        onChange={onGotchisSort}
                    >
                        {/*<MenuItem value={'totalRew'}>Current reward</MenuItem>*/}
                        <MenuItem value='withSetsRarityScore'>RS (modified)</MenuItem>
                        <MenuItem value='baseRarityScore'>RS (base)</MenuItem>
                        <MenuItem value='kinship'>KIN</MenuItem>
                        <MenuItem value='experience'>EXP</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box className={classes.list}>
                {
                    gotchis.map((gotchi, i)=>{
                        return <div className={classes.listItem}  key={i}>
                            <Gotchi gotchi={gotchi} />
                        </div>
                    })
                }
            </Box>
        </>
    );
}