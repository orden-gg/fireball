import { Divider, Link } from '@mui/material';

import { Gotchi as GotchiModel } from 'shared/models';

import { Gotchi } from 'components/Gotchi/Gotchi';
import { CustomTooltip } from 'components/custom/CustomTooltip';

import { gotchiIdentityListStyles } from './styles';

interface IdentityListProps {
  gotchis: GotchiModel[] | number[];
  title?: string;
  isDivider?: boolean;
}

export function IdentityList({ gotchis, title, isDivider }: IdentityListProps) {
  const classes = gotchiIdentityListStyles();

  return (
    <>
      {isDivider && <Divider className={classes.divider} />}

      {title && (
        <h3 className={classes.identityTitle}>
          {title} [<span>{gotchis.length}</span>]
        </h3>
      )}
      <div className={classes.identityList}>
        {gotchis.map((gotchi: GotchiModel | number, index: number) =>
          typeof gotchi !== 'number' ? (
            <Link key={index} className={classes.identityItem} href={`/gotchi/${gotchi.id}`} target='_blank'>
              <CustomTooltip
                className={classes.gotchiIdTooltip}
                title={
                  <Gotchi
                    gotchi={gotchis[index]}
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
                  />
                }
                placement='left-end'
                followCursor
              >
                <span className={classes.identityItem} key={index}>
                  {gotchi.id}
                </span>
              </CustomTooltip>
            </Link>
          ) : (
            <Link
              key={index}
              className={classes.identityItem}
              href={`https://app.aavegotchi.com/portal/${gotchi}`}
              target='_blank'
            >
              <span className={classes.identityItem} key={index}>
                {gotchi}
              </span>
            </Link>
          )
        )}
      </div>
    </>
  );
}
