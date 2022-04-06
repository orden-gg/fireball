import React from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Switch, Tooltip } from '@mui/material';

import CustomTooltip from 'components/custom/CustomTooltip';

import styles from './styles';

export default function RealmSwitchButton({ view }) {
    const classes = styles();
    const match = useRouteMatch();
    const history = useHistory();

    const updateView = () => {
        let path = view === 'list' ? 'map' : 'list';
        let url = `${match.url}/${path}`;

        console.log('🥕', url)
        // history.push({ pathname: url });

        history.push({
            path: url,
            search: qs.stringify(params, { arrayFormat: 'comma' })
        });

        // if (clientActive) {
        //     history.push({ pathname: url, search: `?address=${clientActive}` });
        // } else {
        // }
    }

    return (
        <CustomTooltip
            title={`Switch to ${view === 'map' ? 'list' : 'map'}`}
            enterTouchDelay={0}
        >
            <Switch
                className={classes.button}
                checked={view === 'map'}
                onChange={updateView}
            />
        </CustomTooltip>
    );
}
