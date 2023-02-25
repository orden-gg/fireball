import { useEffect, useState } from 'react';

import { Identity } from 'shared/models';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { TheGraphApi } from 'api';

import { styles } from './styles';

interface GotchiLevelProps {
  id: string;
}

export function GotchiIdentity({ id }: GotchiLevelProps) {
  const classes = styles();
  const [identity, setIdentity] = useState<Identity>();
  const [identityLoaded, setIdentityLoaded] = useState<boolean>();

  useEffect(() => {
    let isMounted: boolean = true;

    TheGraphApi.getFBGotchiIdentityById(Number(id))
      .then((response: Identity) => {
        if (isMounted) {
          setIdentity(response);
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        if (isMounted) {
          setIdentityLoaded(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [identity]);

  return (
    <>
      {identityLoaded ? (
        <CustomTooltip title={<p>identity</p>} enterTouchDelay={0} placement='top' followCursor>
          <div className={classes.gotchiIdentity}>1/1</div>
        </CustomTooltip>
      ) : (
        <></>
      )}
    </>
  );
}
