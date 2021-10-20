import React, {createContext, useState} from 'react';
import Web3 from 'web3';
import useLocalStorage from '../hooks/useLocalStorage';
import { useMetamask } from 'use-metamask';

export const LoginContext = createContext({});

const LoginContextProvider = (props) => {
    const { connect, metaState } = useMetamask();
    const [storageAddresses, setStorageAddresses] = useLocalStorage('LOGGED_ADDRESSES', JSON.parse(localStorage.getItem('LOGGED_ADDRESSES')) || []);
    const [storageActive, setStorageActive] = useLocalStorage('ACTIVE_ADDRESS', JSON.parse(localStorage.getItem('ACTIVE_ADDRESS')) || '');
    const [gotchiIds, setGotchiIds] = useState([]); // ids for random SVG render

    const [activeAddress, setActiveAddress] = useState(storageActive);
    const [isMetamaskActive, setIsMetamaskActive] = useState(false);

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
                await connect(Web3);
                return true;
            } catch (error) {
                console.log(error);
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
            getActiveAddressSvgId
        }}>
            { props.children }
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;
