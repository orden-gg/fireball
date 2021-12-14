import React, { useEffect, useState, useRef, useContext } from 'react';
import { Typography, useTheme } from '@mui/material';
import { gotchisStyles } from '../styles';
import Gotchi from '../../../components/Gotchi/Gotchi';
// import '../styles.css';
import { GuildsContext } from '../../../contexts/GuildsContext';
import { Box } from '@mui/system';

export default function GuildsGotchis() {
    const classes = gotchisStyles();
    const theme = useTheme();
    const { guildGotchis } = useContext(GuildsContext);
    // const [ groupedByAddress, setGroupedByAddress ] = useState([]);
    // scrolling
    

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
        // let gotchisCache = [ ...guildGotchis ]
        // setGroupedByAddress(
        //     guildData.members?.map( member => (
        //         {
        //             address: member,
        //             gotchis: guildGotchis.filter( gotchi => member.toLowerCase() === gotchi.owner.id.toLowerCase())
        //         }
        //     )).sort((a,b) => (
        //         // b.modifiedRarityScore - a.modifiedRarityScore
        //         b.gotchis.length - a.gotchis.length
        //     ))
        // );
        
    }, [guildGotchis]);

    return (
        <Box className={classes.guildGotchis}>
            <div className={classes.guildGotchisInner}>
                {renderGotchis(guildGotchis)}
                {/* {
                    groupedByAddress?.map( (member, index) => (

                        <div className={classes.guildMember}>
                            <Typography className={classes.memberName}> Member {member.address}</Typography>
                            <div className={classes.memberGotchis} key={index}>
                                {renderGotchis(member.gotchis)}
                            </div>
                        </div>
                    ))
                } */}
            </div>
        </Box>
    );
}
