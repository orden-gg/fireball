import { NavigateFunction } from 'react-router-dom';

import { Switch } from '@mui/material';

import * as fromClientStore from '../../store';
import { useAppDispatch } from 'core/store/hooks';

import { RealmView } from 'pages/Client/constants';

import { CustomTooltip } from 'components/custom/CustomTooltip';

import { styles } from './styles';

export function RealmSwitchButton({ view, navigate }: { view: string; navigate: NavigateFunction }) {
  const classes = styles();

  const dispatch = useAppDispatch();

  const updateView = (): void => {
    const path: RealmView = view === RealmView.List ? RealmView.Map : RealmView.List;

    dispatch(fromClientStore.setRealmView(path));

    navigate(`realm/${path}`);
  };

  return (
    <CustomTooltip title={`Switch to ${view === 'map' ? 'list' : 'map'}`} enterTouchDelay={0} placement={'bottom'}>
      <Switch className={classes.button} checked={view === 'map'} onChange={updateView} />
    </CustomTooltip>
  );
}
