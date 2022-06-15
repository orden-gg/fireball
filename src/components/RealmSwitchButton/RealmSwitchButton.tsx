import { useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import { Switch } from '@mui/material';

import qs from 'query-string';

import { CustomTooltip } from 'components/custom/CustomTooltip';

import { styles } from './styles';

export function RealmSwitchButton({ view }) {
    const classes = styles();

    const match = useRouteMatch();
    const location = useLocation();
    const history = useHistory();
    const params = qs.parse(location.search);

    const updateView = () => {
        const path = view === 'list' ? 'map' : 'list';
        const url = `${match.url}/${path}`;

        history.push({
            pathname: url,
            search: qs.stringify(params)
        });
    };

    return (
        <CustomTooltip
            title={`Switch to ${view === 'map' ? 'list' : 'map'}`}
            enterTouchDelay={0}
            placement={'bottom'}
        >
            <Switch
                className={classes.button}
                checked={view === 'map'}
                onChange={updateView}
            />
        </CustomTooltip>
    );
}
