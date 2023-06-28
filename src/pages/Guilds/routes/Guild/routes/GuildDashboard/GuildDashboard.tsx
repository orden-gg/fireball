import { useEffect, useState } from 'react';

import CallMade from '@mui/icons-material/CallMade';
import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import { DateTime } from 'luxon';

import { EthersApi } from 'api';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import { POLYGON_SCAN_URL } from 'shared/constants';

import { GuildChannelingActivity, GuildClaimsActivity } from 'pages/Guilds/models';

import { ContentInner } from 'components/Content/ContentInner';
import { CustomModal } from 'components/CustomModal/CustomModal';
import { EthAddress } from 'components/EthAddress/EthAddress';
import { GotchiPreviewModal } from 'components/Gotchi/GotchiPreviewModal/GotchiPreviewModal';
import { AlphaTokenIcon, FomoTokenIcon, FudTokenIcon, IconProps, KekTokenIcon } from 'components/Icons/Icons';
import { ParcelPreview } from 'components/Previews/ParcelPreview/ParcelPreview';

import { CommonUtils } from 'utils';

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
  const guildClaims: GuildClaimsActivity[] = useAppSelector(fromGuildsStore.getGuildClaimsActivity);
  const isGuildClaimsLoaded: boolean = useAppSelector(fromGuildsStore.getGuildClaimsActivityLoaded);

  useEffect(() => {
    dispatch(fromGuildsStore.onLoadGuildChannelingActivity(guildMembers));
    dispatch(fromGuildsStore.onLoadGuildClaimsActivity(guildMembers));
  }, []);

  const handleGotchiModal = (gotchiId: number): void => {
    setModalGotchiId(gotchiId);
    setIsGotchiModalOpen(true);
  };

  const handleRealmModal = (realmId: number): void => {
    setModalRealmId(realmId);
    setIsRealmModalOpen(true);
  };

  const getAlchemicaIcon = (index: number, props?: IconProps): JSX.Element => {
    const Icon = icons[index];

    return <Icon {...props} />;
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
              <TableContainer>
                <Table stickyHeader aria-label='dashboard table' className={classes.guildDashboardTable}>
                  <TableHead className={classes.guildDashboardTableHead}>
                    <TableRow>
                      <TableCell>owner</TableCell>
                      <TableCell>gotchi</TableCell>
                      <TableCell>realm</TableCell>
                      <TableCell>altar</TableCell>
                      <TableCell>alchemica</TableCell>
                      <TableCell>time</TableCell>
                      <TableCell>tx</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className={classes.guildDashboardTableBody}>
                    {guildChanneling.map((channel, index) => (
                      <TableRow key={'row-' + index}>
                        <TableCell>
                          <EthAddress address={channel.parcel.owner} isShowIcon={true} isClientLink={true} />
                        </TableCell>
                        <TableCell>
                          <div
                            className={classes.guildDashboardLink}
                            onClick={() => handleGotchiModal(Number(channel.gotchiId))}
                          >
                            {channel.gotchiId}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={classes.guildDashboardLink}
                            onClick={() => handleRealmModal(Number(channel.realmId))}
                          >
                            {channel.realmId}
                          </div>
                        </TableCell>
                        <TableCell>{channel.parcel.equippedInstallations[0].level}</TableCell>
                        <TableCell>
                          <div className={classes.guildDashboardAlchemicaList}>
                            {channel.alchemica.map((amount: string, index: number) => {
                              const Icon = icons[index];

                              return (
                                <div className={classes.guildDashboardAlchemicaItem} key={index}>
                                  <Icon width={14} height={14} />
                                  <span>
                                    {CommonUtils.convertFloatNumberToSuffixNumber(
                                      Number(EthersApi.fromWei(amount).toFixed(0))
                                    )}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </TableCell>
                        <TableCell>
                          {DateTime.fromSeconds(Number(channel.timestamp)).toRelative({ locale: 'en' })}
                        </TableCell>
                        <TableCell>
                          <Link
                            className={classes.guildDashboardLink}
                            href={`${POLYGON_SCAN_URL}tx/${channel.transaction}`}
                            target='_blank'
                          >
                            {channel.transaction.substring(channel.transaction.length - 4)}
                            <CallMade fontSize='inherit' />
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
          <GuildDashboardPanel isDataLoading={!isGuildClaimsLoaded}>
            {guildClaims.length ? (
              <TableContainer>
                <Table stickyHeader aria-label='dashboard table' className={classes.guildDashboardTable}>
                  <TableHead className={classes.guildDashboardTableHead}>
                    <TableRow>
                      <TableCell>owner</TableCell>
                      <TableCell>gotchi</TableCell>
                      <TableCell>realm</TableCell>
                      <TableCell>alchemica</TableCell>
                      <TableCell>time</TableCell>
                      <TableCell>tx</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className={classes.guildDashboardTableBody}>
                    {guildClaims.map((claim, index) => (
                      <TableRow key={'row-' + index}>
                        <TableCell>
                          <EthAddress address={claim.parcel.owner} isShowIcon={true} isClientLink={true} />
                        </TableCell>
                        <TableCell>
                          <div
                            className={classes.guildDashboardLink}
                            onClick={() => handleGotchiModal(Number(claim.gotchiId))}
                          >
                            {claim.gotchiId}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className={classes.guildDashboardLink}
                            onClick={() => handleRealmModal(Number(claim.realmId))}
                          >
                            {claim.realmId}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={classes.guildDashboardAlchemicaList}>
                            <div className={classes.guildDashboardAlchemicaItem}>
                              {getAlchemicaIcon(Number(claim.alchemicaType), { height: 14, width: 14 })}
                              <span>
                                {CommonUtils.convertFloatNumberToSuffixNumber(EthersApi.fromWei(claim.amount))}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {DateTime.fromSeconds(Number(claim.timestamp)).toRelative({ locale: 'en' })}
                        </TableCell>
                        <TableCell>
                          <Link
                            className={classes.guildDashboardLink}
                            href={`${POLYGON_SCAN_URL}tx/${claim.transaction}`}
                            target='_blank'
                          >
                            {claim.transaction.substring(claim.transaction.length - 4)}
                            <CallMade fontSize='inherit' />
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div className={classes.guildDashboardNoData}>
                <div>no data</div>
              </div>
            )}
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
