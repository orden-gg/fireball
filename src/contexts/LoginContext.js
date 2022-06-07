import{ createContext, useState } from 'react';

import { ethers } from 'ethers';
import { useMetamask } from 'use-metamask';

import useLocalStorage from 'hooks/useLocalStorage';

export const LoginContext = createContext({});

const LoginContextProvider = (props) => {
    const { connect, metaState } = useMetamask();
    const [storageAddresses, setStorageAddresses] = useLocalStorage(
        'LOGGED_ADDRESSES',
        JSON.parse(localStorage.getItem('LOGGED_ADDRESSES')) || []
    );
    const [storageActive, setStorageActive] = useLocalStorage(
        'ACTIVE_ADDRESS',
        JSON.parse(localStorage.getItem('ACTIVE_ADDRESS')) || ''
    );

    const [activeAddress, setActiveAddress] = useState(storageActive);
    const [isMetamaskActive, setIsMetamaskActive] = useState(false);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const selectActiveAddress = (address) => {
        setStorageActive(address);
        setActiveAddress(address);

        const isMetamaskActive = metaState.account[0] === address;

        setIsMetamaskActive(isMetamaskActive);
    };

    const logoutAddress = (event, address) => {
        let filtered = storageAddresses.filter(item => item.address !== address);

        event.stopPropagation();

        setStorageAddresses(filtered);
        selectActiveAddress(filtered.length ? filtered[0].address : '');

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

    return (
        <LoginContext.Provider value={{
            storageAddresses,
            setStorageAddresses,

            activeAddress,
            setActiveAddress,
            selectActiveAddress,

            logoutAddress,
            updateAddressName,

            connectMetamask,
            isMetamaskActive,
            setIsMetamaskActive,

            dropdownOpen,
            setDropdownOpen
        }}>
            { props.children }
        </LoginContext.Provider>
    );
};

export default LoginContextProvider;
