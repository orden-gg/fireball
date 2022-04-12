import React, { useContext, useState } from 'react';
import { Button, Typography } from '@mui/material';

import Modal from 'components/Modal/Modal';
import GuildWearables from '../GuildWearables';
import { GuildsContext } from 'pages/Guilds/GuildsContext';

import { guildDetailsStyles } from '../../styles';

export default function GuildsDetails() {
    const classes = guildDetailsStyles();
    const { currentGuild } = useContext(GuildsContext);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <div className={classes.detailsWrapper}>
                <Button
                    variant="contained"
                    className={classes.detailsButton}
                    onClick={() => setModalOpen(true)}
                >
                    More Details
                </Button>
            </div>

            <Modal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                className={classes.detailsModal}
            >
                 <ul className={classes.detailsList}>
                     {
                        currentGuild.description.map((item, index) => (
                            <li className={classes.detailsItem} key={index}>
                                <p className={classes.detailTitle}>{item.title}</p>
                                <div className={classes.detailBody}>
                                    <Typography className={classes.detailText}>{item.text}</Typography>
                                </div>
                            </li>
                        ))
                    }
                    {
                        currentGuild.wearables?.length > 0 && (
                            <li className={classes.detailsItem}>
                                <p className={classes.detailTitle}>Guild wearables</p>
                                <div className={classes.detailBody}>
                                    <div className={classes.guildWearables}>
                                        {
                                            <GuildWearables
                                                wearables={currentGuild.wearables}
                                                className={classes.guildWearable}
                                            />
                                        }
                                    </div>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </Modal>
        </>
    );
}
