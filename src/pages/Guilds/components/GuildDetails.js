import { useState } from 'react';
import { Button, Typography } from '@mui/material';

import { CustomModal } from 'components/Modal/Modal';

import GuildWearables from './GuildWearables';
import { guildDetailsStyles } from '../styles';

export default function GuildsDetails({ guild }) {
    const classes = guildDetailsStyles();

    const [modalOpen, setModalOpen] = useState(false);

    if (!guild?.description?.length && !guild?.wearables.length) {
        return null;
    }

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

            <CustomModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                className={classes.detailsModal}
            >
                 <ul className={classes.detailsList}>
                     {
                        guild.description?.map((item, index) => (
                            <li className={classes.detailsItem} key={index}>
                                <p className={classes.detailTitle}>{item.title}</p>
                                <div className={classes.detailBody}>
                                    <Typography className={classes.detailText}>{item.text}</Typography>
                                </div>
                            </li>
                        ))
                    }
                    {
                        guild.wearables?.length > 0 && (
                            <li className={classes.detailsItem}>
                                <p className={classes.detailTitle}>Guild wearables</p>
                                <div className={classes.detailBody}>
                                    <div className={classes.guildWearables}>
                                        {
                                            <GuildWearables
                                                wearables={guild.wearables}
                                                className={classes.guildWearable}
                                            />
                                        }
                                    </div>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </CustomModal>
        </>
    );
}
