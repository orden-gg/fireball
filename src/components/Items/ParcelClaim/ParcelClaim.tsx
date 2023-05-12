import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { AlchemicaTypes } from 'shared/constants';
import { ParcelAlchemica } from 'shared/models';

import { CustomTooltip } from 'components/custom/CustomTooltip';

import { ParcelClaimBar } from './components';
import { parcelClaimStyles } from './styles';

interface ParcelClaimProps {
  currentAmount: ParcelAlchemica;
  supplyRate: ParcelAlchemica;
  capacities: ParcelAlchemica;
}

export function ParcelClaim({ currentAmount, supplyRate, capacities }: ParcelClaimProps) {
  const classes = parcelClaimStyles();
  const [currentAmountParcelToClaim, setCurrentAmountParcelToClaim] = useState<ParcelAlchemica>({
    [AlchemicaTypes.Fud]: 0,
    [AlchemicaTypes.Fomo]: 0,
    [AlchemicaTypes.Alpha]: 0,
    [AlchemicaTypes.Kek]: 0
  });

  const [parcelRates, setParcelRates] = useState<ParcelAlchemica>({
    [AlchemicaTypes.Fud]: 0,
    [AlchemicaTypes.Fomo]: 0,
    [AlchemicaTypes.Alpha]: 0,
    [AlchemicaTypes.Kek]: 0
  });

  const [parcelCapacities, setParcelCapacities] = useState<ParcelAlchemica>({
    [AlchemicaTypes.Fud]: 0,
    [AlchemicaTypes.Fomo]: 0,
    [AlchemicaTypes.Alpha]: 0,
    [AlchemicaTypes.Kek]: 0
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setIsLoaded(true);
    } else {
      setCurrentAmountParcelToClaim(currentAmount);
      setParcelCapacities(capacities);
      setParcelRates(supplyRate);
      setIsLoaded(true);
    }
  }, [currentAmount, supplyRate, capacities]);

  return currentAmount !== undefined ? (
    <div className={classNames(classes.claimList)}>
      {isLoaded ? (
        <>
          <span className={classes.claimListHead}>
            <CustomTooltip
              placement='top'
              title={<>current status for alchemica harvesting</>}
              disableInteractive
              arrow
            >
              <span className={classes.claimName}>to claim</span>
            </CustomTooltip>
          </span>
          {currentAmount && (
            <>
              {Object.entries(parcelCapacities).map(([tokenName]) => (
                <ParcelClaimBar
                  key={tokenName}
                  supplyRate={parcelRates[tokenName]}
                  tokenName={tokenName}
                  currentAmount={currentAmountParcelToClaim[tokenName]}
                  capacities={parcelCapacities[tokenName]}
                />
              ))}
            </>
          )}
        </>
      ) : (
        0
      )}
    </div>
  ) : (
    <></>
  );
}
