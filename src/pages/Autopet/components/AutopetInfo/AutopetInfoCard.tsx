import { CircularProgress } from '@mui/material';
import classNames from 'classnames';

import { infoStyles } from '../../styles';

interface AutopetInfoCardProps {
    name: string;
    count: any;
}

export function AutopetInfoCard({ name, count }: AutopetInfoCardProps) {
    const classes = infoStyles();

    return (
        <div className={classNames(classes.autopetInfoCard)}>
            <span className={classes.autopetCardName}>{name}:</span>

            <span className={classes.autopetCardCount}>
                {count ? count : <CircularProgress color='inherit' />}
            </span>
        </div>
    );
}
