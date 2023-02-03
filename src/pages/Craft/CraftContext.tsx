import { createContext, useEffect, useState, useContext, useCallback } from 'react';

import { useMetamask } from 'use-metamask';

import { Erc1155Categories, INSTALLATION_CONTRACT, TILES_CONTRACT } from 'shared/constants';
import { BalancesContext } from 'contexts/BalancesContext';
import { AlchemicaApi } from 'api';

export const CraftContext = createContext({});

export const CraftContextProvider = (props: any) => {
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [accountAddress, setAccountAddress] = useState<string>('');
  const [tokensApprovals, setTokenApprovals] = useState<any>({
    [Erc1155Categories.Installation]: [],
    [Erc1155Categories.Tile]: []
  });
  const [isAlchemicaApproved, setIsAlchemicaApproved] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>({});
  const [isItemSelected, setIsItemSelected] = useState<boolean>(false);
  const [category, setCategory] = useState<string>(Erc1155Categories.Installation);
  const [maxCraftAmount, setMaxCraftAmount] = useState<number>(1);

  const { tokens } = useContext<any>(BalancesContext);
  const { getAccounts, metaState } = useMetamask();

  const setWalletAddress = async (): Promise<void> => {
    const accounts = getAccounts && (await getAccounts());

    setAccountAddress(accounts[0]);
  };

  const getMaxCraftAmount = useCallback((): number => {
    const isFreeItem: boolean = selectedItem.alchemicaCost.every((cost: number) => cost === 0);
    const amounts: number[] = selectedItem.alchemicaCost
      .map((price, index) => (tokens[index].amount === 0 ? -1 : Math.floor(tokens[index].amount / price)))
      .filter(amount => amount !== -1);
    const minAmount = Math.min(...amounts) || 0;

    return minAmount > 200 || isFreeItem ? 200 : minAmount;
  }, [selectedItem, tokens]);

  useEffect(() => {
    if (metaState.isConnected && !isWalletConnected) {
      setIsWalletConnected(true);
      setWalletAddress();
    } else if (!metaState.isConnected) {
      setIsWalletConnected(false);
    }
  }, [metaState]);

  useEffect(() => {
    if (isWalletConnected) {
      (async () => {
        const installationApprovals: boolean[] = await Promise.all([
          AlchemicaApi.isFudApproved(accountAddress, INSTALLATION_CONTRACT),
          AlchemicaApi.isFomoApproved(accountAddress, INSTALLATION_CONTRACT),
          AlchemicaApi.isAlphaApproved(accountAddress, INSTALLATION_CONTRACT),
          AlchemicaApi.isKekApproved(accountAddress, INSTALLATION_CONTRACT)
        ]);
        const tileApprovals: boolean[] = await Promise.all([
          AlchemicaApi.isFudApproved(accountAddress, TILES_CONTRACT),
          AlchemicaApi.isFomoApproved(accountAddress, TILES_CONTRACT),
          AlchemicaApi.isAlphaApproved(accountAddress, TILES_CONTRACT),
          AlchemicaApi.isKekApproved(accountAddress, TILES_CONTRACT)
        ]);

        setTokenApprovals({
          [Erc1155Categories.Installation]: installationApprovals,
          [Erc1155Categories.Tile]: tileApprovals
        });
      })();
    }
  }, [accountAddress]);

  useEffect(() => {
    if (isItemSelected) {
      const maxCraftAmount: number = getMaxCraftAmount();

      setMaxCraftAmount(maxCraftAmount);
    }
  }, [selectedItem, tokens]);

  useEffect(() => {
    setIsAlchemicaApproved(tokensApprovals[category].every((isApproved: boolean) => isApproved));
  }, [category, tokensApprovals]);

  return (
    <CraftContext.Provider
      value={{
        isWalletConnected,
        tokens,
        tokensApprovals,
        isAlchemicaApproved,
        selectedItem,
        isItemSelected,
        category,
        maxCraftAmount,

        setTokenApprovals,
        setCategory,
        setSelectedItem,
        setIsItemSelected
      }}
    >
      {props.children}
    </CraftContext.Provider>
  );
};
