import React, { createContext, useEffect, useState } from 'react';

import { ethers } from 'ethers';
import { useMetamask } from 'use-metamask';

import alchemicaApi from 'api/alchemica.api';
import ghstApi from 'api/ghst.api';
import useLocalStorage from 'hooks/useLocalStorage';
import commonUtils from 'utils/commonUtils';

export const LoginContext = createContext({});

const LoginContextProvider = (props) => {
    const { connect, metaState } = useMetamask();
    const [storageAddresses, setStorageAddresses] = useLocalStorage('LOGGED_ADDRESSES', JSON.parse(localStorage.getItem('LOGGED_ADDRESSES')) || []);
    const [storageActive, setStorageActive] = useLocalStorage('ACTIVE_ADDRESS', JSON.parse(localStorage.getItem('ACTIVE_ADDRESS')) || '');
    const [gotchiIds, setGotchiIds] = useState([]); // ids for random SVG render

    const [activeAddress, setActiveAddress] = useState(storageActive);
    const [isMetamaskActive, setIsMetamaskActive] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [fudBalance, setFudBalance] = useState(0);
    const [fomoBalance, setFomoBalance] = useState(0);
    const [alphaBalance, setAlphaBalance] = useState(0);
    const [akekBalance, setAkekBalance] = useState(0);
    const [ghstBalance, setGhstBalance] = useState(0);

    useEffect(() => {
        Promise.all([
            alchemicaApi.getFudBalance(activeAddress),
            alchemicaApi.getFomoBalance(activeAddress),
            alchemicaApi.getAlphaBalance(activeAddress),
            alchemicaApi.getAkekBalance(activeAddress),
            ghstApi.getBalanceOf(activeAddress),
        ]).then(([fud, fomo, alpha, akek, ghst]) => {
            setFudBalance(commonUtils.convertFloatNumberToSuffixNumber(fud))
            setFomoBalance(commonUtils.convertFloatNumberToSuffixNumber(fomo))
            setAlphaBalance(commonUtils.convertFloatNumberToSuffixNumber(alpha))
            setAkekBalance(commonUtils.convertFloatNumberToSuffixNumber(akek))
            setGhstBalance(commonUtils.convertFloatNumberToSuffixNumber(ghst));
        });
    }, [activeAddress])

    const selectActiveAddress = (address) => {
        setStorageActive(address);
        setActiveAddress(address);

        metaState.account[0] === address ? setIsMetamaskActive(true) : setIsMetamaskActive(false);
    };

    const logoutAddress = (event, address) => {
        let filtered = storageAddresses.filter(item => item.address !== address);

        setStorageAddresses(filtered);
        selectActiveAddress(filtered.length ? filtered[0].address : '');

        event.stopPropagation();
    };

    const updateAddressName = (address, newName) => {
        let storageAddressesCache = [...storageAddresses];
        let itemForUpdate = storageAddressesCache.find((item) => item.address === address);

        itemForUpdate.name = newName;
        setStorageAddresses(storageAddressesCache);
    };

    const connectMetamask = async () => {
        if (metaState.isAvailable && !metaState.isConnected) {
            try {
                await connect(ethers.providers.Web3Provider, 'any');
                return true;
            } catch (error) {
                return false;
            }
        }
    };

    const getActiveAddressSvgId = () => {
        let active = storageAddresses.find((item) => item.address === activeAddress);

        return active?.gotchiId ? active.gotchiId : 5402;
    };

    return (
        <LoginContext.Provider value={{
            storageAddresses,
            setStorageAddresses,

            activeAddress,
            selectActiveAddress,

            logoutAddress,
            updateAddressName,

            connectMetamask,
            isMetamaskActive,
            setIsMetamaskActive,

            gotchiIds,
            setGotchiIds,

            getActiveAddressSvgId,

            modalOpen,
            setModalOpen,

            dropdownOpen,
            setDropdownOpen,

            fudBalance,
            fomoBalance,
            alphaBalance,
            akekBalance,
            ghstBalance
        }}>
            { props.children }
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;
