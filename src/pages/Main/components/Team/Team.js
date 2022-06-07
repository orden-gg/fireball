import { useEffect, useState } from 'react';
import { Avatar, CircularProgress, Grid, Link } from '@mui/material';
import { Box } from '@mui/system';

import classNames from 'classnames';

import Subtitle from 'components/Subtitle/Subtitle';
import Gotchi from 'components/Gotchi/Gotchi';
import thegraph from 'api/thegraph.api';
import hopeUp from 'assets/images/gotchi-placeholder-up.svg';

import styles from './styles';

const gotchisIds = [4285, 8005, 4282, 23470, 13998, 5127, 3672];

export default function Team() {
    const classes = styles();
    const [dataSpinner, setDataSpinner] = useState(true);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        thegraph.getGotchiesByIds(gotchisIds).then((response) => {
            const formattedArray = [];

            response.forEach((gotchi) => {
                formattedArray.push(gotchi.data.aavegotchi);
            });

            setMembers(formattedArray);
            setDataSpinner(false);
        }).catch((error) => console.log(error));
    }, []);

    return (
        <Box>
            <Grid container justifyContent='center'>
                <Grid item xs={12} md={10}>
                    <Subtitle variant='h4' innerBg='rgb(39, 42, 48)' margin='0 0 40px'>
                        ordenGG DAO
                    </Subtitle>
                </Grid>
            </Grid>

            <div className={classes.teamWrapper}>
                {dataSpinner ? (
                    <CircularProgress component='span' color='primary' size={22}/>
                ) : (
                    <>
                        {
                            members.map((gotchi, index) =>
                                <Gotchi
                                    className='narrowed team'
                                    gotchi={gotchi}
                                    key={index}
                                    render={['name', 'svg']}
                                />
                            )
                        }
                        <Link
                            href='https://discord.gg/orden'
                            target='_blank'
                            className={classNames(classes.teamMember, classes.teamUser)}
                            underline='none'
                        >
                            <p className={classes.aavegotchiName} variant='h3'>You!</p>
                            <Avatar className={classes.aavegotchiAvatar} variant='square' src={ hopeUp } />
                        </Link>
                    </>
                )}
            </div>
        </Box>
    );
}
