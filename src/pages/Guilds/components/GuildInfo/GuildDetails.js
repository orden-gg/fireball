import React, { useContext } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { GuildsContext } from 'contexts/GuildsContext';

import { guildDetailsStyles } from '../../styles';

export default function GuildsDetails() {
    const classes = guildDetailsStyles();
    const { currentGuild } = useContext(GuildsContext);

    return (
        <Accordion className={classes.detailsWrapper}>
            <AccordionSummary
                className={classes.detailsHead}
                expandIcon={
                    <KeyboardArrowDownIcon className={classes.detailsArrow} />
                }
            >
                More Details
            </AccordionSummary>
            <AccordionDetails className={classes.detailsBody}>
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
                </ul>
            </AccordionDetails>
        </Accordion>
    );
}
