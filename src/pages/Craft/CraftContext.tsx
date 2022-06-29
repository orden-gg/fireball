import { createContext, useEffect, useState, useContext } from 'react';

import { useMetamask } from 'use-metamask';

import { INSTALLATION_CONTRACT, TILES_CONTRACT } from 'shared/constants';
import { BalancesContext } from 'contexts/BalancesContext';
import { AlchemicaApi } from 'api';

export const CraftContext = createContext({});

export const CraftContextProvider = (props: any) => {
    const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
    const [accountAddress, setAccountAddress] = useState<string>('');
    const [tokensApprovals, setTokenApprovals] = useState<object>({
        tile: [],
        installation: []
    });
    const [isAlchemicaApproved, setIsAlchemicaApproved] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<any>({});
    const [isItemSelected, setIsItemSelected] = useState<boolean>(false);
    const [category, setCategory] = useState<string>('installation');
    const [maxCraftAmount, setMaxCraftAmount] = useState<number>(1);

    const { tokens } = useContext<any>(BalancesContext);
    const { getAccounts, metaState } = useMetamask();

    const setWalletAddress = async (): Promise<void> => {
        const accounts = await getAccounts();

        setAccountAddress(accounts[0]);
    };

    useEffect(() => {
        if (metaState.isConnected && !isWalletConnected) {
            setIsWalletConnected(true);
            setWalletAddress();
        } else if (!metaState.isConnected) {
            setIsWalletConnected(false);
        }
    }, [metaState]);

    useEffect(() => {
        (async () => {
            if (isWalletConnected) {
                const installationApprovals = await Promise.all([
                    AlchemicaApi.isFudApproved(accountAddress, INSTALLATION_CONTRACT),
                    AlchemicaApi.isFomoApproved(accountAddress, INSTALLATION_CONTRACT),
                    AlchemicaApi.isAlphaApproved(accountAddress, INSTALLATION_CONTRACT),
                    AlchemicaApi.isKekApproved(accountAddress, INSTALLATION_CONTRACT)
                ]);
                const tileApprovals = await Promise.all([
                    AlchemicaApi.isFudApproved(accountAddress, TILES_CONTRACT),
                    AlchemicaApi.isFomoApproved(accountAddress, TILES_CONTRACT),
                    AlchemicaApi.isAlphaApproved(accountAddress, TILES_CONTRACT),
                    AlchemicaApi.isKekApproved(accountAddress, TILES_CONTRACT)
                ]);

                setTokenApprovals({
                    tile: tileApprovals,
                    installation: installationApprovals
                });
            }
        })();
    }, [accountAddress]);

    useEffect(() => {
        if (isItemSelected) {
            const isFreeItem: boolean = selectedItem.alchemicaCost.every(cost => cost === 0);
            const maxCraftAmount: number = Math.min(
                ...selectedItem.alchemicaCost.map((price, index) =>
                    Math.floor(tokens[index].amount / price)
                )
            ) || 0;

            setMaxCraftAmount(maxCraftAmount > 200 || isFreeItem ? 200 : maxCraftAmount);
        }
    }, [selectedItem, tokens]);

    useEffect(() => {
        setIsAlchemicaApproved(
            tokensApprovals[category].every(isApproved => isApproved)
        );
    }, [category, tokensApprovals]);

    return (
        <CraftContext.Provider value={{
            isWalletConnected,
            tokens,
            tokensApprovals,
            isAlchemicaApproved,
            selectedItem,
            isItemSelected,
            category,
            maxCraftAmount,

            setIsWalletConnected,
            setTokenApprovals,
            setCategory,
            setSelectedItem,
            setIsItemSelected
        }}>
            { props.children }
        </CraftContext.Provider>
    );
};