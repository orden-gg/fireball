import { useContext } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Switch } from '@mui/material';

import { CustomTooltip } from 'components/custom/CustomTooltip';
import { ClientContext } from 'contexts/ClientContext';

import { styles } from './styles';

export function RealmSwitchButton({ view, navigate }: { view: string; navigate: NavigateFunction }) {
    const classes = styles();

    const { setRealmView } = useContext<any>(ClientContext);

    const updateView = () => {
        const path = view === 'list' ? 'map' : 'list';

        setRealmView(path);

        navigate(`realm/${path}`);
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
