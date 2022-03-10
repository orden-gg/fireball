import { useTheme } from '@emotion/react';
import { Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';

import web3 from '../../api/web3';
import { GotchiSkillpointsStyles, CustomTooltipStyles } from './styles';

export default function GotchiSkillPoints({id, usedPoints}) {
    const classes = {
        ...GotchiSkillpointsStyles(),
        ...CustomTooltipStyles()
    };
    const theme = useTheme();
    const [loadingPoints, setLoadingPoints] = useState(true);
    const [availablePoints, setAvailablePoints] = useState(true);

    useEffect(() => {
        let controller = new AbortController();

        setLoadingPoints(true);

        web3.getAvailableSkillPoints(id)
            .then((response)=> {
                if(!controller.signal.aborted) {
                    setAvailablePoints(response);
                }
            }).catch((error) => {
                console.log(error);
            });

        return () => controller?.abort(); // cleanup on destroy

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div>
            {loadingPoints ? (
                <Tooltip 
                    title={
                        <React.Fragment>
                            <div className={classes.tooltip}>
                                <p>available<span>/</span>used <span>skillpoints</span></p>
                            </div>
                        </React.Fragment>
                    }
                    // title={`available / used [skillpoints]`}
                    classes={{ tooltip: classes.customTooltip }}
                    enterTouchDelay={0}
                    placement='top'
                    followCursor
                >
                    <div
                        className={classes.skillpoints}
                        style={{ backgroundColor: availablePoints > 0 && theme.palette.primary.main, color: availablePoints > 0 && theme.palette.secondary.main }}
                    >
                        <span>{availablePoints}</span>
                        /
                        <span style={{ color: usedPoints > 0 && availablePoints < 1 && theme.palette.primary.main }}>{usedPoints}</span>
                    </div>
                </Tooltip>
            ) : (
                <span>...</span>
            )}
        </div>
    );
}