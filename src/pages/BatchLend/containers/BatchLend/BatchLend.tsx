import { useContext, useEffect, useState } from 'react';

import { Button } from '@mui/material';

import styled from '@emotion/styled';
import classNames from 'classnames';
import { useMetamask } from 'use-metamask';

import { EthersApi, MainApi } from 'api';
import { ClientApi } from 'pages/Client/api';

import { SnackbarContext } from 'contexts/SnackbarContext';

import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { CustomModal } from 'components/CustomModal/CustomModal';
import { EthAddress } from 'components/EthAddress/EthAddress';
import { GotchiImage } from 'components/Gotchi/GotchiImage/GotchiImage';
import { GotchiKinshipTooltip } from 'components/Gotchi/GotchiKinship/GotchiKinshitTooltip';
import { GotchiName } from 'components/Gotchi/GotchiName/GotchiName';
import { GotchiHeartGif, GotchiIcon } from 'components/Icons/Icons';
import { CustomTooltip } from 'components/custom/CustomTooltip';

import { GotchiverseUtils } from 'utils';

import { LendConfirmationModal } from '../../components/LendConfirmationModal/LendConfirmationModal';
import { styles } from './styles';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(192px, 1fr));
  grid-gap: 12px;
`;

export function BatchLend() {
  const classes = styles();

  const { metaState } = useMetamask();
  const { showSnackbar } = useContext<CustomAny>(SnackbarContext);

  const [isLoading, setIsloading] = useState<boolean>(true);
  const [gotchisForLend, setGotchisForLend] = useState<CustomAny[]>([]);
  const [selectedGotchisIds, setSelectedGotchisIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const loadGotchis = (address: string): void => {
    setIsloading(true);

    ClientApi.getGothisForLendByAddress(address)
      .then((res) => setGotchisForLend(res.data.aavegotchis))
      .catch((err) => console.log('err', err))
      .finally(() => setIsloading(false));
  };

  useEffect(() => {
    if (metaState.account[0]) {
      loadGotchis(metaState.account[0]);
    }
  }, [metaState.account[0]]);

  const onSelectGotchi = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string): void => {
    event.stopPropagation();

    const currentGotchisIds = [...selectedGotchisIds];
    const gotchiIdIndex = currentGotchisIds.findIndex((currId) => currId === id);

    if (gotchiIdIndex === -1) {
      if (currentGotchisIds.length < 20) {
        currentGotchisIds.push(id);
      }
    } else {
      currentGotchisIds.splice(gotchiIdIndex, 1);
    }

    setSelectedGotchisIds(currentGotchisIds);
  };

  const onBatchLend = (): void => {
    const batchGotchis = selectedGotchisIds.map((id) => ({
      tokenId: Number(id),
      initialCost: 0,
      period: 1 * 60 * 60,
      revenueSplit: [65, 15, 20],
      originalOwner: metaState.account[0],
      thirdParty: '0x1840248b0c642b9E317F7451FCafc04aA9275550',
      whitelistId: 717,
      revenueTokens: [
        '0x403E967b044d4Be25170310157cB1A4Bf10bdD0f',
        '0x44A6e0BE76e1D9620A7F76588e4509fE4fa8E8C8',
        '0x6a3E7C3c6EF65Ee26975b12293cA1AAD7e1dAeD2',
        '0x42E5E06EF5b90Fe15F853F59299Fc96259209c5C'
      ],
      permissions: 0
    }));

    MainApi.batchLend(batchGotchis)
      .then((transaction) => {
        showSnackbar('success', 'Transaction created');

        EthersApi.waitForTransaction(transaction.hash, 'polygon')
          .then(() => {
            showSnackbar('success', 'Batch Lend succeeded');

            setSelectedGotchisIds([]);
            loadGotchis(metaState.account[0]);
          })
          .catch(() => showSnackbar('error', 'Batch Lend failed'));
      })
      .catch(() => {
        showSnackbar('error', 'Transaction was not created');
      });
  };

  return (
    <>
      <ContentWrapper>
        <ContentInner dataLoading={isLoading}>
          <div className={classes.infoPanel}>
            {/* <div>You can select up to 20 Gotchis (click on them for selection)</div> */}
            <div>Click to select a Gotchi. You may choose up to 20 of them.</div>
            <div className={classes.countWrapper}>
              <span>{gotchisForLend.length}</span>
              <GotchiIcon width={20} height={20} />({selectedGotchisIds.length})
            </div>
          </div>

          <ListContainer>
            {gotchisForLend.map((gotchi) => (
              <div key={gotchi.id} onClick={(event) => onSelectGotchi(event, `${gotchi.id}`)}>
                <div
                  className={classNames(
                    classes.gotchi,
                    `haunt${gotchi.hauntId}`,
                    GotchiverseUtils.getRarityNameByRS(gotchi.modifiedRarityScore)
                  )}
                  style={{
                    borderColor: selectedGotchisIds.find((selectedId) => selectedId === gotchi.id) ? '#fd9af9' : ''
                  }}
                >
                  <div className={classes.gotchiHeader}>
                    <CustomTooltip
                      title={<GotchiKinshipTooltip kinship={gotchi.kinship} />}
                      placement='bottom'
                      arrow={true}
                    >
                      <div className={classes.gotchiKinship}>
                        <span>
                          <GotchiHeartGif width={12} height={12} className={classes.gotchiKinshipIcon} />x
                          {GotchiverseUtils.countKinshipChannelingBoost(gotchi.kinship)}
                        </span>
                      </div>
                    </CustomTooltip>
                  </div>
                  <div className={classes.imageContainer}>
                    <GotchiImage gotchi={gotchi} renderSvgByStats={false} />
                  </div>
                  <GotchiName gotchi={gotchi} />
                </div>
              </div>
            ))}
          </ListContainer>
        </ContentInner>
        <div className={classes.settingsContainer}>
          <div className={classes.settingWrapper}>
            <div className={classes.settingLabel}>Upfront Cost:</div>
            <div className={classes.settingValue}>0</div>
          </div>
          <div className={classes.settingWrapper}>
            <div className={classes.settingLabel}>Lend Duration:</div>
            <div className={classes.settingValue}>1</div>
          </div>
          <div className={classes.settingWrapper}>
            <div className={classes.settingLabel}>Tokens to share:</div>
            <div className={classes.settingValue}>All 4 (fud, fomo, alpha, kek)</div>
          </div>
          <div className={classes.settingWrapper}>
            <div className={classes.settingLabel}>Whitelist ID:</div>
            <div className={classes.settingValue}>717</div>
          </div>
          <div className={classes.settingWrapper}>
            <div className={classes.settingLabel}>Splits:</div>
            <div className={classes.settingValue}>65/15/20</div>
          </div>
          <div className={classes.settingWrapper}>
            <div className={classes.settingLabel}>Third-Party Address:</div>
            <div className={classes.settingLabel}>
              <EthAddress
                address='0x1840248b0c642b9E317F7451FCafc04aA9275550'
                isShowIcon
                isCopyButton
                isPolygonButton
              />
            </div>
          </div>
          <div className={classes.settingsButtonWrapper}>
            <Button
              variant='contained'
              color='warning'
              size='small'
              disabled={selectedGotchisIds.length === 0}
              onClick={() => setIsModalOpen(true)}
            >
              Lend
            </Button>
          </div>
        </div>
      </ContentWrapper>

      <CustomModal modalOpen={isModalOpen} setModalOpen={setIsModalOpen}>
        <LendConfirmationModal
          gotchisForLend={gotchisForLend}
          selectedGotchisIds={selectedGotchisIds}
          onCloseModal={() => setIsModalOpen(false)}
          onConfirmLend={() => onBatchLend()}
        />
      </CustomModal>
    </>
  );
}
