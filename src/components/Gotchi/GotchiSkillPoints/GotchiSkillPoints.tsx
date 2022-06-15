import React, { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';

import mainApi from 'api/main.api';

import { CustomTooltipStyles } from '../styles';

import { styles } from './styles';

export function GotchiSkillPoints({ id, usedPoints }: { id: string, usedPoints: string }) {
    const classes = { ...styles(), ...CustomTooltipStyles() };

    const [loadingPoints, setLoadingPoints] = useState<boolean>(true);
    const [availablePoints, setAvailablePoints] = useState<number>(0);

    useEffect(() => {
        const controller = new AbortController();

        setLoadingPoints(true);

        mainApi.getAvailableSkillPoints(id)
            .then((response) => {
                if (!controller.signal.aborted) {
                    setAvailablePoints(response);
                    setLoadingPoints(false);
                }
            }).catch((error) => {
                console.log(error);
            });

        return () => controller?.abort(); // cleanup on destroy
    }, [id]);

    return (
        <>
            {!loadingPoints ? (
                <Tooltip
                    title={
                        <React.Fragment>
                            <p>available<span>/</span>used <span>skillpoints</span></p>
                        </React.Fragment>
                    }
                    classes={{ tooltip: classes.customTooltip }}
                    enterTouchDelay={0}
                    placement='top'
                    followCursor
                >
                    <div className={classes.skillpoints}>
                        <span className={availablePoints > 0 ? classes.skillpointsHighlight : ''}>
                            {availablePoints}
                        </span>
                        /
                        <span>{usedPoints}</span>
                    </div>
                </Tooltip>
            ) : (
                <div className={classes.skillpoints}>
                    <span>...</span>
                </div>
            )}
        </>
    );
}
