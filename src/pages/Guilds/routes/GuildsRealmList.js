import React, { useContext, useEffect } from 'react';
import { Box } from '@mui/material';

import { GuildsContext } from '../../../contexts/GuildsContext';

import Parcel from '../../../components/Items/Parcel/Parcel';
import GhostLoader from '../../../components/GhostLoader/GhostLoader';
import { guildContentStyles } from '../styles';

export default function ClientRealmList() {
    const classes = guildContentStyles();
    const { guildRealm, setRealmView } = useContext(GuildsContext);

    useEffect( () => {
        setRealmView('list');
    }, []);

    if(!guildRealm.length) {
        return <Box className={classes.loaderBox}>
            <GhostLoader
                animate={!guildRealm.length}
            />
        </Box>
    }

    return (
        <>
            <Box className={classes.guildRealm}>
                {
                    guildRealm.map((parcel, i)=>{
                        return <div className={classes.guildRealmItem}  key={i}>
                            <Parcel parcel={parcel} />
                        </div>
                    })
                }
            </Box>
        </>
    );
}