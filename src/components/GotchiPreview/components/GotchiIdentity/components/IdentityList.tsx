import { useEffect, useState } from 'react';

import { CircularProgress, Divider, Link } from '@mui/material';

import { TheGraphApi } from 'api';

import { IdentityOption } from 'shared/models';

import { Gotchi } from 'components/Gotchi/Gotchi';
import { CustomTooltip } from 'components/custom/CustomTooltip';

import { gotchiIdentityTooltipStyles } from '../../GotchiIdentityTooltip/styles';

interface IdentityListProps {
  identity: IdentityOption[];
  title?: string;
  divider?: boolean;
}

export function IdentityList({ identity, title, divider }: IdentityListProps) {
  const classes = gotchiIdentityTooltipStyles();
  const [claimedGotchis, setClaimedGotchis] = useState<CustomAny>([]);
  const [gotchisLoaded, setGotchisLoaded] = useState<boolean>(false);

  useEffect(() => {
    const gotchisId: number[] = identity.map((gotchi: IdentityOption) => Number(gotchi.gotchiId));
    let isMounted: boolean = true;

    TheGraphApi.getGotchiesByIds(gotchisId)
      .then((response: CustomAny) => {
        if (isMounted) {
          setClaimedGotchis(response.map((gotchi: CustomAny) => gotchi.data.aavegotchi));
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

    return () => {
      isMounted = false;
    };
  }, [identity]);

  return (
    <>
      {divider && <Divider className={classes.divider} />}

      {title && (
        <h3 className={classes.identityTitle}>
          {title} [<span>{identity.length}</span>]
        </h3>
      )}
      <div className={classes.identityList}>
        {identity.map((item: IdentityOption, index: number) => (
          <Link key={index} className={classes.identityItem} href={`/gotchi/${item.gotchiId}`} target='_blank'>
            <CustomTooltip
              className={classes.gotchiIdTooltip}
              title={
                gotchisLoaded ? (
                  <Gotchi
                    gotchi={claimedGotchis[index]}
                    render={[
                      {
                        className: 'gotchiHeader',
                        items: ['collateral', 'kinship', 'level']
                      },
                      {
                        className: 'imageContainer',
                        items: [
                          'svg',
                          {
                            className: 'rsContainer',
                            items: ['rs', 'skillpoints']
                          }
                        ]
                      },
                      'name',
                      'traits'
                    ]}
                    isHighlightLending={true}
                  />
                ) : (
                  <CircularProgress color='primary'></CircularProgress>
                )
              }
              placement='left-end'
              followCursor
            >
              <span className={classes.identityItem} key={index}>
                {item.gotchiId}
              </span>
            </CustomTooltip>
          </Link>
        ))}
      </div>
    </>
  );
}
