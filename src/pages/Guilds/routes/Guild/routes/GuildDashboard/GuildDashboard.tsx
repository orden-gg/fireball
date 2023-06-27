import { useEffect, useState } from 'react';

import { Typography } from '@mui/material';

import classNames from 'classnames';
import { DateTime } from 'luxon';

import { EthersApi } from 'api';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import { GuildChannelingActivity } from 'pages/Guilds/models';

import { ContentInner } from 'components/Content/ContentInner';
import { CustomModal } from 'components/CustomModal/CustomModal';
import { EthAddress } from 'components/EthAddress/EthAddress';
import { GotchiPreviewModal } from 'components/Gotchi/GotchiPreviewModal/GotchiPreviewModal';
import { AlphaTokenIcon, FomoTokenIcon, FudTokenIcon, KekTokenIcon } from 'components/Icons/Icons';
import { ParcelPreview } from 'components/Previews/ParcelPreview/ParcelPreview';

import { GuildDashboardPanel } from '../../components';
import { guildDashboardStyles } from './styles';

const icons = [FudTokenIcon, FomoTokenIcon, AlphaTokenIcon, KekTokenIcon];

export function GuildDashboard(): JSX.Element {
  const classes = guildDashboardStyles();

  const [isGotchiModalOpen, setIsGotchiModalOpen] = useState<boolean>(false);
  const [modalGotchiId, setModalGotchiId] = useState<number | null>(null);
  const [isRealmModalOpen, setIsRealmModalOpen] = useState<boolean>(false);
  const [modalRealmId, setModalRealmId] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  const guildMembers: string[] = useAppSelector(fromGuildsStore.getCurrentGuildMembers);
  const guildChanneling: GuildChannelingActivity[] = useAppSelector(fromGuildsStore.getGuildChannelingActivity);
  const isGuildChannelingLoaded: boolean = useAppSelector(fromGuildsStore.getGuildChannelingActivityLoaded);

  useEffect(() => {
    dispatch(fromGuildsStore.onLoadGuildChannelingActivity(guildMembers));
  }, []);

  const handleGotchiModal = (gotchiId: number): void => {
    setModalGotchiId(gotchiId);
    setIsGotchiModalOpen(true);
  };

  const handleRealmModal = (realmId: number): void => {
    setModalRealmId(realmId);
    setIsRealmModalOpen(true);
  };

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
                {console.log(guildChanneling)}
                <div className={classes.guildDashboardList}>
                  <div className={classNames(classes.guildDashboardListItem, classes.guildDashboardListHeader)}>
                    <div className={classes.guildDashboardListItemShort}>owner</div>
                    <div className={classes.guildDashboardListItemTiny}>gotchi</div>
                    <div className={classes.guildDashboardListItemTiny}>realm</div>
                    <div className={classes.guildDashboardListItemTiny}>altar</div>
                    <div className={classes.guildDashboardListItemShort}>alchemica</div>
                    <div className={classes.guildDashboardListItemShort}>time</div>
                  </div>
                  {guildChanneling.map((channel, index) => (
                    <div className={classes.guildDashboardListItem} key={index}>
                      <div className={classes.guildDashboardListItemShort}>
                        <EthAddress address={channel.parcel.owner} isShowIcon={true} isClientLink={true} />
                      </div>
                      <div className={classes.guildDashboardListItemTiny}>
                        <div
                          className={classes.guildDashboardLink}
                          onClick={() => handleGotchiModal(Number(channel.gotchiId))}
                        >
                          {channel.gotchiId}
                        </div>
                      </div>
                      <div className={classes.guildDashboardListItemTiny}>
                        <div
                          className={classes.guildDashboardLink}
                          onClick={() => handleRealmModal(Number(channel.realmId))}
                        >
                          {channel.realmId}
                        </div>
                      </div>
                      <div className={classes.guildDashboardListItemTiny}>
                        {channel.parcel.equippedInstallations[0].level}
                      </div>
                      <div
                        className={classNames(classes.guildDashboardListItemShort, classes.guildDashboardAlchemicaList)}
                      >
                        {channel.alchemica.map((amount: string, index: number) => {
                          const Icon = icons[index];

                          return (
                            <div className={classes.guildDashboardAlchemicaItem} key={index}>
                              <Icon className={'aa'} width={14} height={14} />
                              <span className={'aa'}>{EthersApi.fromWei(amount)}</span>
                            </div>
                          );
                        })}
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

      {modalGotchiId ? (
        <CustomModal modalOpen={isGotchiModalOpen} setModalOpen={setIsGotchiModalOpen}>
          <GotchiPreviewModal id={modalGotchiId} />
        </CustomModal>
      ) : (
        <></>
      )}

      {modalRealmId ? (
        <CustomModal modalOpen={isRealmModalOpen} setModalOpen={setIsRealmModalOpen}>
          <ParcelPreview parcel={{ id: modalRealmId }} />
        </CustomModal>
      ) : (
        <></>
      )}
    </ContentInner>
  );
}
