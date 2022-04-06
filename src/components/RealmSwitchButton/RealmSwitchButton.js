import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Switch } from '@mui/material';

import qs from 'query-string';

import CustomTooltip from 'components/custom/CustomTooltip';

import styles from './styles';

export default function RealmSwitchButton({ view }) {
    const classes = styles();

    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();
    const params = qs.parse(location.search);

    const updateView = () => {
        let path = view === 'list' ? 'map' : 'list';
        let url = `${match.url}/${path}`;

        console.log('🪂', params)
        console.log('🌴', path)
        console.log('📃', url)

        history.push({
            path: url,
            search: qs.stringify(params)
        });
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
