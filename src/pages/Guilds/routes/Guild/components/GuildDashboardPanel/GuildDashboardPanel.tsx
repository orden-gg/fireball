import { RealmGif } from 'components/Icons/Icons';

import { guildDashboardPanelStyles } from './styles';

export function GuildDashboardPanel({ isDataLoading, children }: { isDataLoading: boolean; children: JSX.Element }) {
  const classes = guildDashboardPanelStyles();

  return (
    <div className={classes.guildDashboardPanel}>
      {isDataLoading ? (
        <div className={classes.guildDashboardPanelLoader}>
          <div className={classes.guildDashboardPanelLoaderIcon}>
            <RealmGif height={32} width={32} />
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
