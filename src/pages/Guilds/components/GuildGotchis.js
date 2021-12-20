import React, { useEffect, useState, useRef, useContext } from 'react';
import { Typography, useTheme } from '@mui/material';
import { gotchisStyles } from '../styles';
import Gotchi from '../../../components/Gotchi/Gotchi';
import { GuildsContext } from '../../../contexts/GuildsContext';
import { Box } from '@mui/system';

export default function GuildsGotchis() {
    const classes = gotchisStyles();
    const theme = useTheme();
    const { guildGotchis } = useContext(GuildsContext);

    const renderGotchis = (gotchis) => {
        return gotchis.map((item) => {
            return (
                <div key={item.id} className={classes.item}>
                    <Gotchi
                        gotchi={item}
                        narrowed={true}
                        render={[
                            {
                                badges: [
                                    'owner',
                                    'level',
                                    'collateral'
                                ]
                            },
                            'svg',
                            'name',
                        ]}
                    />
                </div>
            )
        })
    }

    useEffect( () => {
        
    }, [guildGotchis]);

    return (
        <Box className={classes.guildGotchis}>
            <div className={classes.guildGotchisInner}>
                {renderGotchis(guildGotchis)}
            </div>
        </Box>
    );
}
