import { useEffect } from 'react';

import { Typography } from '@mui/material';

import classNames from 'classnames';
import { DateTime } from 'luxon';

import { EthersApi } from 'api';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import { GuildChannelingActivity } from 'pages/Guilds/models';

import { ContentInner } from 'components/Content/ContentInner';

import { GuildDashboardPanel } from '../../components';
import { guildDashboardStyles } from './styles';

export function GuildDashboard(): JSX.Element {
  const classes = guildDashboardStyles();

  const dispatch = useAppDispatch();

  const guildMembers: string[] = useAppSelector(fromGuildsStore.getCurrentGuildMembers);
  const guildChanneling: GuildChannelingActivity[] = useAppSelector(fromGuildsStore.getGuildChannelingActivity);
  const isGuildChannelingLoaded: boolean = useAppSelector(fromGuildsStore.getGuildChannelingActivityLoaded);

  useEffect(() => {
    dispatch(fromGuildsStore.onLoadGuildChannelingActivity(guildMembers));
  }, []);

  return (
    <ContentInner dataLoading={false} className={classes.guildDashboard}>
      <div className={classes.guildDashboardInner}>
        <div>
          <Typography variant='h6' textAlign='center' marginBottom={1}>
            Channelings
          </Typography>
          <GuildDashboardPanel isDataLoading={!isGuildChannelingLoaded}>
            {guildChanneling.length ? (
              <div style={{ overflowY: 'auto' }}>
                <div className={classes.guildDashboardList}>
                  <div className={classNames(classes.guildDashboardListItem, classes.guildDashboardListHeader)}>
                    <div className={classes.guildDashboardListItemShort}>gotchi</div>
                    <div className={classes.guildDashboardListItemShort}>realm</div>
                    <div className={classes.guildDashboardListItemLong}>alchemica</div>
                    <div className={classes.guildDashboardListItemShort}>time</div>
                  </div>
                  {guildChanneling.map((channel, index) => (
                    <div className={classes.guildDashboardListItem} key={index}>
                      <div className={classes.guildDashboardListItemShort}>{channel.gotchiId}</div>
                      <div className={classes.guildDashboardListItemShort}>{channel.realmId}</div>
                      <div className={classes.guildDashboardListItemLong}>
                        {channel.alchemica.map((alch, alchIndex) => (
                          <span key={alchIndex} style={{ marginLeft: 8 }}>
                            {EthersApi.fromWei(alch)}
                          </span>
                        ))}
                      </div>
                      <div className={classes.guildDashboardListItemShort}>
                        {DateTime.fromSeconds(Number(channel.timestamp)).toRelative({ locale: 'en' })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className={classes.guildDashboardNoData}>
                <div>no data</div>
              </div>
            )}
          </GuildDashboardPanel>
        </div>
        <div>
          <Typography variant='h6' textAlign='center' marginBottom={1}>
            Claims
          </Typography>
          <GuildDashboardPanel isDataLoading={true}>
            <div>bugaa boo</div>
          </GuildDashboardPanel>
        </div>
      </div>
    </ContentInner>
  );
}
