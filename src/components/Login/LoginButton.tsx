import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk';
import { useEffect, useMemo } from 'react';

import { Backdrop, Typography } from '@mui/material';

import { SafeAppProvider } from '@safe-global/safe-apps-provider';
import classNames from 'classnames';
import { ethers } from 'ethers';
import { useMetamask } from 'use-metamask';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromLoginStore from 'core/store/login';

import { DONATE_ADDRESS } from 'shared/constants';
import { LoginAddress as LoginAddressModel } from 'shared/models';

import { EthAddress } from 'components/EthAddress/EthAddress';
import { GnosisIcon, MetamaskIcon } from 'components/Icons/Icons';

import { CommonUtils } from 'utils';

import { useLocalStorage } from 'hooks/useLocalStorage';

import { LoginAddress } from './LoginAddress';
import { LoginNavigation } from './LoginNavigation';
import { styles } from './styles';

const donateAddress: LoginAddressModel = {
  name: 'fireball donations addr',
  address: DONATE_ADDRESS
};

export function LoginButton() {
  const classes = styles();

  const { connect, getAccounts, metaState } = useMetamask();
  const { sdk, safe } = useSafeAppsSDK();

  const [isDonateAddressShown, setIsDonateAddressShown] = useLocalStorage(
    'DONATE_ADDRESS_SHOWN',
    JSON.parse(localStorage.getItem('DONATE_ADDRESS_SHOWN') as string)
  );

  const dispatch = useAppDispatch();

  const activeAddress: Undefinable<string | null> = useAppSelector(fromLoginStore.getActiveAddress);
  const storeLoggedAddresses: LoginAddressModel[] = useAppSelector(fromLoginStore.getLoggedAddresses);
  const isDropdownOpen: boolean = useAppSelector(fromLoginStore.getIsDropdownOpen);

  const safeProvider = useMemo(() => {
    if (safe.safeAddress) {
      return new ethers.providers.Web3Provider(new SafeAppProvider(safe, sdk));
    }
  }, [sdk, safe]);

  useEffect(() => {
    // connect metamask on load
    if (metaState.isAvailable) {
      (async () => {
        try {
          if (getAccounts) {
            const accounts: string[] = await getAccounts();

            console.log(
              'connectMetamask trigger',
              `safe: ${safe.safeAddress}`,
              safe?.safeAddress.length,
              !safe?.safeAddress.length
            );
            if (accounts.length && !safe?.safeAddress.length) {
              connectMetamask();
            }
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (safe.safeAddress) {
      connectSafe();
    }
  }, [safe]);

  useEffect(() => {
    // TODO this logic should be double checked! There are no bugs, but from functional perspective it runs too much times.
    // handle metamask accounts
    console.log('metaState trigger!', `safe: ${safe.safeAddress}`);
    if (metaState.account[0]) {
      console.log('metaState trigger!', 'metaState.account[0]', metaState.account[0], `safe: ${safe.safeAddress}`);
      if (metaState.account[0] === activeAddress || !activeAddress?.length) {
        console.log(
          'metaState trigger!',
          'metaState.account[0]',
          metaState.account[0],
          'dispatch!',
          `safe: ${safe.safeAddress}`
        );
        dispatch(fromLoginStore.selectActiveAddress(metaState.account[0]));
      }
      dispatch(fromLoginStore.updateMetamaskLoggedAddress(metaState.account[0]));
    } else if (metaState.account[0] === activeAddress) {
      // on metamask logout
      console.log(
        'metaState trigger!',
        'metaState.account[0] === activeAddress',
        metaState.account[0],
        activeAddress,
        `safe: ${safe.safeAddress}`
      );
      dispatch(fromLoginStore.selectActiveAddress(storeLoggedAddresses.length ? storeLoggedAddresses[0].address : ''));
    }
  }, [metaState]);

  useEffect(() => {
    if (isDonateAddressShown === null) {
      dispatch(fromLoginStore.addAddress(donateAddress));
      setIsDonateAddressShown(true);
    }
  }, [isDonateAddressShown]);

  const connectMetamask = async (): Promise<CustomAny> => {
    if (metaState.isAvailable && !metaState.isConnected) {
      console.log('trying to connect MM...', `safe: ${safe.safeAddress}`);
      try {
        if (connect) {
          await connect(ethers.providers.Web3Provider, 'any');
          console.log('MM connected with provider', ethers.providers.Web3Provider);

          return true;
        }
      } catch (error) {
        return false;
      }
    }
  };

  const connectSafe = async (): Promise<CustomAny> => {
    console.log('trying to connect safe...', `safe: ${safe.safeAddress}`);

    try {
      if (connect) {
        await connect(safeProvider, 'any');
        console.log('safe connected with provider', safeProvider);

        return true;
      }
    } catch (error) {
      return false;
    }
  };

  const onCloseDropdown = (): void => {
    dispatch(fromLoginStore.toggleLoginDropdown(false));
  };

  const onToggleDropdown = (): void => {
    dispatch(fromLoginStore.toggleLoginDropdown(!isDropdownOpen));
  };

  const onAddressSubmit = (address: string): void => {
    const duplicated: Undefinable<LoginAddressModel> = storeLoggedAddresses.find(
      (item: LoginAddressModel) => item.address === address
    );

    onCloseDropdown();

    dispatch(fromLoginStore.selectActiveAddress(address));

    if (!duplicated) {
      dispatch(
        fromLoginStore.addAddress({
          address,
          name: address.slice(0, 6)
        })
      );
    }
  };

  const onAccountLogout = (loginAddress: LoginAddressModel) => {
    if (loginAddress.address === DONATE_ADDRESS) {
      setIsDonateAddressShown(false);
    }
  };

  return (
    <>
      <div className={classNames(classes.button, isDropdownOpen && 'opened')}>
        <div className={classes.buttonInner} onClick={onToggleDropdown}>
          {safe.safeAddress && (
            <div>
              <GnosisIcon height={20} width={20} />
              {CommonUtils.cutAddress(safe.safeAddress, '..')}
            </div>
          )}
          {activeAddress ? (
            metaState.account[0] === activeAddress && (
              <div className={classes.buttonIcon}>
                <MetamaskIcon width={14} height={14} />
              </div>
            )
          ) : (
            <div className={classes.caption}>
              <Typography className={classes.captionText}>Connect account</Typography>
            </div>
          )}

          {activeAddress ? (
            <div className={classes.address}>
              <EthAddress address={activeAddress} isShowIcon={true} />
            </div>
          ) : null}
        </div>

        {isDropdownOpen ? (
          <div className={classNames(classes.buttonDropdown, metaState.account[0] && 'offset-top')}>
            <div className={classNames(classes.loginList, 'custom-scroll')}>
              {metaState.account[0] ? (
                <div className={classes.loginAddressBox}>
                  <LoginAddress address={{ name: 'Metamask', address: metaState.account[0] }} isMetamask={true} />
                </div>
              ) : null}

              {storeLoggedAddresses.length
                ? storeLoggedAddresses.map((item: CustomAny, index: number) => {
                    return <LoginAddress address={item} key={index} onLogout={onAccountLogout} />;
                  })
                : null}
            </div>
            <LoginNavigation onSubmit={onAddressSubmit} />
          </div>
        ) : null}
      </div>

      <Backdrop open={isDropdownOpen} onClick={onCloseDropdown} className={classes.loginBackdrop}></Backdrop>
    </>
  );
}
