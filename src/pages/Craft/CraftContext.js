import { createContext, useEffect, useState, useContext } from 'react';

import { useMetamask } from 'use-metamask';

import { BalancesContext } from 'contexts/BalancesContext';
import alchemicaApi from 'api/alchemica.api';
import { INSTALLATION_CONTRACT, TILES_CONTRACT } from 'api/common/constants';
import commonUtils from 'utils/commonUtils';

export const CraftContext = createContext({});

const CraftContextProvider = props => {
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [accountAddress, setAccountAddress] = useState('');
    const [tokensApprovals, setTokenApprovals] = useState({
        tile: [],
        installation: []
    });
    const [isAlchemicaApproved, setIsAlchemicaApproved] = useState(false);
    const [selectedItem, setSelectedItem] = useState({});
    const [category, setCategory] = useState('installation');
    const [maxCraftAmount, setMaxCraftAmount] = useState(1);

    const { tokens } = useContext(BalancesContext);
    const { getAccounts, metaState } = useMetamask();

    const setWalletAddress = async () => {
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
                    alchemicaApi.isFudApproved(accountAddress, INSTALLATION_CONTRACT),
                    alchemicaApi.isFomoApproved(accountAddress, INSTALLATION_CONTRACT),
                    alchemicaApi.isAlphaApproved(accountAddress, INSTALLATION_CONTRACT),
                    alchemicaApi.isKekApproved(accountAddress, INSTALLATION_CONTRACT)
                ]);
                const tileApprovals = await Promise.all([
                    alchemicaApi.isFudApproved(accountAddress, TILES_CONTRACT),
                    alchemicaApi.isFomoApproved(accountAddress, TILES_CONTRACT),
                    alchemicaApi.isAlphaApproved(accountAddress, TILES_CONTRACT),
                    alchemicaApi.isKekApproved(accountAddress, TILES_CONTRACT)
                ]);

                setTokenApprovals({
                    tile: tileApprovals,
                    installation: installationApprovals
                });
            }
        })();
    }, [accountAddress]);

    useEffect(() => {
        const isSelected = !commonUtils.isEmptyObject(selectedItem);

        if (isSelected) {
            setMaxCraftAmount(() => {
                const isFreeItem = selectedItem.alchemicaCost.every(cost => cost === 0);

                if (isFreeItem) {
                    return 200;
                } else {
                    const maxCraftAmount = Math.min(
                        ...selectedItem.alchemicaCost.map((price, index) =>
                            Math.floor(tokens[index].amount / price)
                        )
                    ) || 0;

                    return maxCraftAmount <= 200 ? maxCraftAmount : 200;
                }
            });
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
            isAlchemicaApproved,
            tokensApprovals,

            selectedItem,
            category,
            maxCraftAmount,

            setTokenApprovals,
            setCategory,
            setSelectedItem,
            setIsWalletConnected
        }}>
            { props.children }
        </CraftContext.Provider>
    );
};

export default CraftContextProvider;
