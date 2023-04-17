import { useEffect, useState } from 'react';

import { CircularProgress, Autocomplete, TextField } from '@mui/material';

import classNames from 'classnames';
import { DateTime } from 'luxon';

import { EthersApi, TheGraphApi } from 'api';

import { Erc721Categories, InstallationTypeNames } from 'shared/constants';
import { FireballGotchi, Gotchi, GotchiExtended, IdentityOption, SalesHistoryModel } from 'shared/models';

import { EthAddress } from 'components/EthAddress/EthAddress';
import { GotchiInventory } from 'components/GotchiInventory/GotchiInventory';
import { GotchiPreview } from 'components/GotchiPreview/GotchiPreview';
import {
  GotchiContent,
  GotchiFooter,
  GotchiHead,
  GotchiInfoItem,
  GotchiInfoList,
  GotchiPreviewIdentity,
  GotchiTraits,
  GotchiView
} from 'components/GotchiPreview/components';
import { SalesHistory } from 'components/Previews/SalesHistory/SalesHistory';
import {
  HistoryHead,
  HistoryItem,
  HistoryPrice,
  HistoryRow,
  HistoryWearables
} from 'components/Previews/SalesHistory/components';
import { EthAddress } from 'components/EthAddress/EthAddress';

import { GotchiUtils, InstallationsUtils, ItemUtils } from 'utils';

import { gotchiPreviewModalStyles } from './styles';
import { useMetamask } from 'use-metamask';
import { GotchiInventory } from 'components/GotchiInventory/GotchiInventory';
import { ViewInAppButton } from 'components/ViewInAppButton/ViewInAppButton';

import { GotchiUtils } from 'utils';

import { gotchiPreviewModalStyles } from './styles';

export function GotchiPreviewModal({ id, gotchi }: { id: number; gotchi?: GotchiExtended }) {
  const classes = gotchiPreviewModalStyles();
  const [spawnId, setSpawnId] = useState<string>();
  const [modalGotchi, setModalGotchi] = useState<CustomAny>(null);
  const [availibleParcels, setAvailibleParcels] = useState<CustomAny[]>([]);
  const [availibleGates, setAvailibleGates] = useState<CustomAny[]>([]);
  const [isGotchiLoading, setIsGotchiLoading] = useState<boolean>(true);
  const [historyLoaded, setHistoryLoaded] = useState<boolean>(false);
  const [salesHistory, setSalesHistory] = useState<SalesHistoryModel[]>([]);
  const [gotchiInventory, setGotchiInventory] = useState<number[]>([]);

  const [claimedGotchis, setClaimedGotchis] = useState<Gotchi[]>([]);
  const [unclaimedGotchiIds, setUnclaimedGotchiIds] = useState<number[]>([]);
  const [gotchisLoaded, setGotchisLoaded] = useState<boolean>(false);
  const { metaState } = useMetamask();

  useEffect(() => {
    let isMounted: boolean = true;

    if (gotchi) {
      setModalGotchi(gotchi);
      setGotchiInventory([]);
      setSalesHistory([]);
      setIsGotchiLoading(false);
    } else {
      const responses: [Promise<Gotchi>, Promise<FireballGotchi>] = [
        TheGraphApi.getGotchiById(id),
        TheGraphApi.getFireballGotchiById(id)
      ];

      Promise.all(responses)
        .then(async ([gotchi, fireballGotchis]: [Gotchi, FireballGotchi]) => {
          if (isMounted) {
            const extendedGotchi: GotchiExtended = { ...gotchi, ...fireballGotchis };
            const sortedInventory: number[] = gotchi.equippedWearables
              .concat(fireballGotchis.badges)
              .filter((id: number) => id !== 0);

            setGotchiInventory(sortedInventory);
            setModalGotchi(extendedGotchi);
            setIsGotchiLoading(false);
          }
        })
        .catch((error) => console.log(error));

      TheGraphApi.getErc721SalesHistory(id, Erc721Categories.Aavegotchi)
        .then((response: SalesHistoryModel[]) => {
          if (isMounted) {
            setSalesHistory(response);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => isMounted && setHistoryLoaded(true));
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (modalGotchi) {
      const claimedGotchiIds: number[] = modalGotchi.identity.claimed.map((identityGotchi: IdentityOption) =>
        Number(identityGotchi.gotchiId)
      );
      const unclaimedGotchiIds: number[] = modalGotchi.identity.unclaimed.map((identityGotchi: IdentityOption) =>
        Number(identityGotchi.gotchiId)
      );
      let isMounted: boolean = true;

      if (claimedGotchiIds.length > 0) {
        TheGraphApi.getGotchiesByIds(claimedGotchiIds)
          .then((claimedGotchis: Gotchi[]) => {
            if (isMounted) {
              setClaimedGotchis(Object.values(claimedGotchis));
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            if (isMounted) {
              setGotchisLoaded(true);
            }
          });
      } else {
        setGotchisLoaded(true);
      }

      setUnclaimedGotchiIds(unclaimedGotchiIds);

      return () => {
        isMounted = false;
      };
    }
  }, [modalGotchi]);

  useEffect(() => {
    if (modalGotchi) {
      const ownAddress = metaState.account[0];
      const allAddresses = Array.from(new Set([modalGotchi.originalOwner.id, ownAddress]));

      const promises: Promise<CustomAny>[] = allAddresses.map((address) => TheGraphApi.getRealmByAddress(address));

      Promise.all(promises)
        .then((response) => {
          const flatResponse = response.flat();
          const modifiedParcels = flatResponse.map((parcel) => {
            const installations: CustomAny[] = InstallationsUtils.combineInstallations(parcel.installations);
            const altar = installations.find((installation) => installation.type === InstallationTypeNames.Altar);
            const cooldown = altar ? InstallationsUtils.getCooldownByLevel(altar.level, 'seconds') : 0;

            return {
              ...parcel,
              cooldown: cooldown,
              nextChannel: parcel.lastChanneled + cooldown,
              altarLevel: altar ? altar.level : 0,
              installations: installations
            };
          });
          const bestRealm = modifiedParcels
            .filter((r) => DateTime.fromSeconds(r.nextChannel) < DateTime.now())
            .sort((a, b) => b.altarLevel - a.altarLevel);
          setAvailibleParcels(bestRealm);

          const fireballGates = [
            { id: '5209', parcelHash: 'aadventures-personality-turned', altarLevel: 9 },
            { id: '10346', parcelHash: 'continues-producing-bidder', altarLevel: 8 },
            { id: '18356', parcelHash: 'outlet-frens-homeland', altarLevel: 9 }
          ];
          setAvailibleGates(fireballGates);

          setSpawnId(bestRealm[0]?.parcelId);
        })
        .catch((e) => console.log(e));
    }
  }, [modalGotchi]);

  const handleOnChangeDropListRealm = (_event, newValue) => {
    if (!newValue) {
      setSpawnId(availibleParcels[0].parcelId);
    } else {
      setSpawnId(newValue.parcelId);
    }
  };

  const handleOnChangeDropListGate = (_event, newValue) => {
    if (!newValue) {
      setSpawnId(availibleGates[0].id);
    } else {
      setSpawnId(newValue.id);
    }
  };

  return (
    <div className={classNames(classes.previewModal, (isGotchiLoading || !modalGotchi) && 'emptyState')}>
      {!isGotchiLoading ? (
        modalGotchi ? (
          <>
            <GotchiPreview>
              <GotchiView gotchi={modalGotchi} />
              <GotchiContent>
                <GotchiHead
                  name={modalGotchi.name || 'Unnamed'}
                  owner={modalGotchi.originalOwner?.id || modalGotchi.owner?.id}
                />

                <GotchiInfoList>
                  <GotchiInfoItem label='id' value={modalGotchi.id} />
                  <GotchiInfoItem label='kinship' value={modalGotchi.kinship} />
                  <GotchiInfoItem label='haunt' value={modalGotchi.hauntId} />
                  <GotchiInfoItem
                    label='staked'
                    value={parseFloat(
                      GotchiUtils.getStakedAmount(modalGotchi.collateral, modalGotchi.stakedAmount).toPrecision(5)
                    )}
                  />
                </GotchiInfoList>

                <GotchiTraits
                  numericTraits={modalGotchi.numericTraits}
                  modifiedNumericTraits={modalGotchi.modifiedNumericTraits}
                />

                <GotchiPreviewIdentity
                  gotchisLoaded={gotchisLoaded}
                  claimedGotchis={claimedGotchis}
                  unclaimedGotchiIds={unclaimedGotchiIds}
                  className={classes.identityBlock}
                />

                {modalGotchi.originalOwner?.id || modalGotchi.owner?.id ? (
                  <GotchiFooter>
                    <>
                      <ViewInAppButton link={`/gotchi/${modalGotchi.id}`} className={classes.button} target='_self'>
                        FULL INFORMATION
                      </ViewInAppButton>

                      <ViewInAppButton
                        link={`https://app.aavegotchi.com/gotchi/${modalGotchi.id}`}
                        className={classes.button}
                      >
                        View at aavegotchi.com
                      </ViewInAppButton>
                    </>
                    {availibleParcels && availibleGates && (
                      <>
                        <ViewInAppButton
                          link={`https://verse.aavegotchi.com/?spawnId=${spawnId}&gotchi=${modalGotchi.id}`}
                          className={classes.button}
                        >
                          Fireball Farmeer
                        </ViewInAppButton>

                        <ViewInAppButton
                          link={`https://verse.aavegotchi.com/?spawnId=aarena&gotchi=${modalGotchi.id}`}
                          className={classes.button}
                        >
                          Jump into the Aarena
                        </ViewInAppButton>

                        <Autocomplete
                          disablePortal
                          onChange={(event: CustomAny, newValue: string | null) => {
                            handleOnChangeDropListRealm(event, newValue);
                          }}
                          id='combo-box-realms'
                          options={availibleParcels}
                          getOptionLabel={(option) => option.altarLevel + 'lvl: ' + option.parcelHash}
                          renderInput={(params) => <TextField {...params} size='small' label='Realms' />}
                          sx={{ width: '40%', margin: 1 }}
                        />
                        <Autocomplete
                          disablePortal
                          onChange={(event: CustomAny, newValue: string | null) => {
                            handleOnChangeDropListGate(event, newValue);
                          }}
                          id='combo-box-gates'
                          options={availibleGates}
                          getOptionLabel={(option) => option.altarLevel + 'lvl: ' + option.parcelHash}
                          renderInput={(params) => <TextField {...params} size='small' label='Gates O_GG' />}
                          sx={{ width: '40%', margin: 1 }}
                        />
                      </>
                    )}
                  </GotchiFooter>
                ) : (
                  <></>
                )}
              </GotchiContent>
            </GotchiPreview>
            {gotchiInventory.length > 0 ? (
              <div className={classes.inventory}>
                <div className={classes.title}>Inventory</div>
                <GotchiInventory items={gotchiInventory} />
              </div>
            ) : (
              <></>
            )}
            {Number(modalGotchi?.timesTraded) > 0 && (
              <SalesHistory historyLoaded={historyLoaded} className={classes.listings}>
                <div className={classes.title}>Sales History</div>
                <HistoryHead className={classes.salesHeader}>
                  <HistoryItem className={classes.address}>seller</HistoryItem>
                  <HistoryItem className={classes.address}>buyer</HistoryItem>
                  <HistoryItem className={classes.price}>price</HistoryItem>
                  <HistoryItem className={classes.date}>time</HistoryItem>
                  <HistoryItem className={classes.wearables}>wearables</HistoryItem>
                </HistoryHead>

                <>
                  {salesHistory.map((listing: SalesHistoryModel, index: number) => (
                    <HistoryRow key={index}>
                      <HistoryItem className={classes.address}>
                        <EthAddress address={listing.seller} isShowIcon isCopyButton isPolygonButton isClientLink />
                      </HistoryItem>
                      <HistoryItem className={classes.address}>
                        <EthAddress address={listing.buyer} isShowIcon isCopyButton isPolygonButton isClientLink />
                      </HistoryItem>
                      <HistoryPrice className={classes.price} price={EthersApi.fromWei(listing.priceInWei)} />
                      <HistoryItem className={classes.date}>
                        <>{DateTime.fromSeconds(parseInt(listing.timePurchased)).toRelative()}</>
                      </HistoryItem>
                      <HistoryWearables className={classes.wearables} wearables={listing.equippedWearables} />
                    </HistoryRow>
                  ))}
                </>
              </SalesHistory>
            )}
          </>
        ) : (
          <div className={classes.title}>There is no Gotchi with such ID :(</div>
        )
      ) : (
        <CircularProgress color='primary' />
      )}
    </div>
  );
}
