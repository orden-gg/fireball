import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { Avatar, Grid, Link, Typography } from '@mui/material';
import classNames from 'classnames';

import hopeUp from '../../../../assets/images/avatars/hope_up.svg';
import thegraph from '../../../../api/thegraph';
import GotchiSvg from '../../../../components/Gotchi/GotchiSvg';

const gotchiesId = [4271, 8005, 4282, 23470];

export default function Team() {
    const classes = useStyles();
    const [members, setMembers] = useState([]);

    const getGotchi = async (id) => {
        let gotchi;

        await thegraph.getGotchiById(id).then( (result) => {
            gotchi = result;
        });

        return gotchi;
    }

    useEffect( () => {
        let promises = gotchiesId.map( (id) => {
            return getGotchi(id);
        });

        Promise.all(promises).then( (result) => {
            setMembers(result);
        });

    }, []);

    return (
        <Grid container justifyContent='center'>
            <Grid item xs={12}>
                <Typography className={classes.mainTitle} variant='h4'>orden DAO</Typography>
            </Grid>

            {
                members.map( (gotchi, index) => (
                    <Grid item xs={6} sm={4} md={2} key={index}>
                        <Link href={`https://www.aavegotchi.com/gotchi/${gotchi.id}`} target='_blank' className={classes.teamMember} underline='none'>
                            <Typography className={classes.aavegotchiName} variant='h3'>{gotchi.name}</Typography>
                            <GotchiSvg id={gotchi.id} size={107} hideWareables={false} />
                        </Link>
                    </Grid>
                ))
            }
            <Grid item xs={6} sm={4} md={2}>
                <Link href='https://discord.gg/NXEEETxSkC' target='_blank' className={classes.teamMember} underline='none'>
                    <Typography className={classNames(classes.aavegotchiName, classes.aavegotchiYouName)} variant='h3'>You!</Typography>
                    <Avatar className={classes.aavegotchiAvatar} variant='square' src={ hopeUp } />
                </Link>
            </Grid>
        </Grid>
    );
}