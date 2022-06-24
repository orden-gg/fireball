import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material';

import { CustomTooltip } from 'components/custom/CustomTooltip';
import { ClientContext } from 'contexts/ClientContext';

import { styles } from './styles';

export function RealmSwitchButton({ view }) {
    const classes = styles();

    const location = useLocation();
    const navigate = useNavigate();

    const { setRealmView } = useContext<any>(ClientContext);

    const updateView = () => {
        const path = view === 'list' ? 'map' : 'list';
        const url = `${path}`;

        setRealmView(path);

        navigate(`${location.pathname}/realm/${url}`, { state: {} });
    };

    if (location.pathname?.split('/').slice(-1)[0] !== view) {
        return <></>;
    }

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
