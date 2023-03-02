import { useEffect, useState } from 'react';

import { Paper } from '@mui/material';

import classNames from 'classnames';
import { DateTime } from 'luxon';

import { Erc1155Categories } from 'shared/constants';

import { ActiveListingButton } from 'components/ActiveListingButton/ActiveListingButton';
import { EthAddress } from 'components/EthAddress/EthAddress';
import { ParcelImage } from 'components/Items/ParcelImage/ParcelImage';
import { ParcelInstallations } from 'components/Items/ParcelInstallations/ParcelInstallations';
import { ParcelSurvey } from 'components/Items/ParcelSurvey/ParcelSurvey';

import { CitadelUtils, GotchiverseUtils } from 'utils';

import { EthersApi, TheGraphApi } from 'api';

import { SalesHistory } from '../SalesHistory/SalesHistory';
import { HistoryHead, HistoryItem, HistoryPrice, HistoryRow } from '../SalesHistory/components';
import { styles } from './styles';

export function ParcelPreview({ parcel }: { parcel: any }) {
  const classes = styles();

  const [history, setHistory] = useState<any[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState<boolean>(false);

  const boosts: Array<{ name: string; value: any }> = [
    { name: 'fud', value: parcel.fudBoost },
    { name: 'fomo', value: parcel.fomoBoost },
    { name: 'alpha', value: parcel.alphaBoost },
    { name: 'kek', value: parcel.kekBoost }
  ];

  useEffect(() => {
    let mounted = true;

    TheGraphApi.getErc721SalesHistory(Number(parcel.id), Erc1155Categories.Installation)
      .then((res: any) => {
        if (mounted) {
          setHistory(res);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        if (mounted) {
          setHistoryLoaded(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, [parcel.id]);

  const modifyName = (hash: string) => {
    return hash.replace(/-/g, ' ');
  };

  return (
    <div className={classes.container}>
      <div className={classes.inner}>
        <div className={classes.image}>
          <ParcelImage parcel={parcel} imageSize={300} />

          <ParcelSurvey
            className={classNames(classes.survey, 'active')}
            surveys={parcel.surveys}
            alchemica={parcel.alchemica}
            size={parcel.size}
          />
        </div>

        <div className={classes.content}>
          <div>
            <div className={classes.contentTop}>
              <h5 className={classes.name}>{modifyName(parcel.parcelHash)}</h5>
              <EthAddress
                address={parcel.owner?.id}
                isShowIcon={true}
                isClientLink={true}
                isPolygonButton={true}
                isCopyButton={true}
              />
            </div>

            <div className={classes.badges}>
              <Paper className={classes.badge} elevation={0}>
                <span className={classes.highlighted}>id:</span>
                {parcel.id}
              </Paper>
              <Paper className={classes.badge} elevation={0}>
                <span className={classes.highlighted}>district:</span>
                {parcel.district}
              </Paper>
              <Paper className={classes.badge} elevation={0}>
                <span className={classes.highlighted}>size:</span>
                {CitadelUtils.getParcelSizeName(Number(parcel.size))}(
                {CitadelUtils.getParcelDimmentions(Number(parcel.size))})
              </Paper>
            </div>

            <div className={classes.boosts}>
              {boosts.map((boost, i) => {
                const multiplierValue = GotchiverseUtils.getAlchemicaMultiplier(boost.name);
                const totalBoost = boost.value * multiplierValue;

                return boost.value > 0 ? (
                  <div className={classNames(classes.boost, boost.name)} key={i}>
                    <img src={GotchiverseUtils.getAlchemicaTokenImg(boost.name)} alt={boost.name} width={32} />
                    <div>
                      <h5>{totalBoost}</h5>
                      <p>
                        {boost.value}pts x {multiplierValue}
                      </p>
                    </div>
                  </div>
                ) : null;
              })}
            </div>

            <div className={classes.installations}>
              <ParcelInstallations parcel={parcel} size={80} />
            </div>
          </div>

          <div className={classes.listing}>
            <ActiveListingButton
              item={{
                erc: 'erc721',
                id: parcel.id,
                type: 'parcel',
                category: '4'
              }}
            />
          </div>
        </div>
      </div>
      {history.length > 0 && (
        <>
          <h5 className={classes.salesTitle}>Sales History</h5>
          <SalesHistory historyLoaded={historyLoaded}>
            <HistoryHead>
              <HistoryItem>seller</HistoryItem>
              <HistoryItem>buyer</HistoryItem>
              <HistoryItem>time</HistoryItem>
              <HistoryItem>price</HistoryItem>
            </HistoryHead>

            <>
              {history.map((item, index) => (
                <HistoryRow key={index}>
                  <HistoryItem>
                    <EthAddress
                      address={item.seller}
                      isShowIcon={true}
                      isClientLink={true}
                      isPolygonButton={true}
                      isCopyButton={true}
                    />
                  </HistoryItem>
                  <HistoryItem>
                    <EthAddress
                      address={item.buyer}
                      isShowIcon={true}
                      isClientLink={true}
                      isPolygonButton={true}
                      isCopyButton={true}
                    />
                  </HistoryItem>
                  <HistoryItem>
                    <>{DateTime.fromSeconds(parseInt(item.timePurchased)).toRelative()}</>
                  </HistoryItem>
                  <HistoryPrice price={EthersApi.fromWei(item.priceInWei)} />
                </HistoryRow>
              ))}
            </>
          </SalesHistory>
        </>
      )}
    </div>
  );
}
