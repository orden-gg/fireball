import { Button, Typography } from '@mui/material';
import { useState } from 'react';

import { CustomModal } from 'components/Modal/Modal';

import { styles } from '../styles';

export function About() {
    const classes = styles();

    const [isOpened, setIsOpened] = useState<boolean>(false);

    const handleButtonClick = (isModalOpen: boolean): void => {
        setIsOpened(isModalOpen);
    };

    return (
        <>
            <Button
                className={classes.button}
                variant="contained"
                size='large'
                onClick={() => handleButtonClick(!isOpened)}
            >About fireball.gg</Button>

            <CustomModal setModalOpen={setIsOpened} modalOpen={isOpened} className={classes.modal}>
                <div className={classes.container}>
                    <Typography variant='h4' className={classes.title}>About fireball.gg</Typography>

                    <Typography className={classes.text}>The ambition of this project is to create a developer, <br /> player and market-friendly start point for the aavegotchi game protocol.</Typography>

                    <Typography className={classes.subText}>This application includes:</Typography>
                    <ul className={classes.list}>
                        <li className={classes.listItem}>The main client is good for browsing accounts; the user can check the owner's aavogotchis, rentals, land, equipment, installations and other important accounts stats and game assets.</li>
                        <li className={classes.listItem}>Renting explorer can help you to browse a renting market by any stat, view whitelists, etc.</li>
                        <li className={classes.listItem}>Raffle calculator contains the information on the active raffle entrances, rewards and average chances; tere is also data for most previous raffles and results for all accounts!</li>
                        <li className={classes.listItem}>Guilds page is our vision on how guilds will be represented in the future aavegotchi updates; guild leaders can add a list of their member's addresses pseudo anonymously and enjoy combined guild land, equipment and aavegocthi view.</li>
                        <li className={classes.listItem}>The world map page is useful for visualising accounts lang possession and useful functions for expanse and planning: land for sale, guilds bases, filters, search, multi-select & share tool!</li>
                    </ul>

                    <Typography className={classes.text}>The state of the client is represented in URL, so the user can share the state of the fireball-gg client easily</Typography>

                    <Typography className={classes.text}>
                        Fireball-gg is developed by <a href='https://twitter.com/orden_gg' rel='noreferrer' target='_blank' className={classes.link}>ordenGG</a>,
                        a group of professional developers and e-sport players. We deployed the first version of this client in March 2021 and the code was fully open-sourced later that year.
                    </Typography>
                </div>
            </CustomModal>
        </>
    );
}
