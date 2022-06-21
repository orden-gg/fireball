import { createContext, useState } from 'react';

import { ethers } from 'ethers';
import { useMetamask } from 'use-metamask';

import useLocalStorage from 'hooks/useLocalStorage';

export const LoginContext = createContext({});

export const LoginContextProvider = (props: any) => {
    const { connect, metaState } = useMetamask();
    const [storageAddresses, setStorageAddresses] = useLocalStorage(
        'LOGGED_ADDRESSES',
        JSON.parse(localStorage.getItem('LOGGED_ADDRESSES') as any) || []
    );
    const [storageActive, setStorageActive] = useLocalStorage(
        'ACTIVE_ADDRESS',
        JSON.parse(localStorage.getItem('ACTIVE_ADDRESS') as any) || ''
    );

    const [activeAddress, setActiveAddress] = useState<string>(storageActive);
    const [isMetamaskActive, setIsMetamaskActive] = useState<boolean>(false);

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const selectActiveAddress = (address: string): void => {
        setStorageActive(address);
        setActiveAddress(address);

        const isMetamaskActive = metaState.account[0] === address;

        setIsMetamaskActive(isMetamaskActive);
    };

    const logoutAddress = (event: any, address: string) => {
        const filtered: any[] = storageAddresses.filter((item: any) => item.address !== address);

        event.stopPropagation();

        setStorageAddresses(filtered);
        selectActiveAddress(filtered.length ? filtered[0].address : '');

    };

    const updateAddressName = (address: string, newName: string) => {
        const storageAddressesCache: any[] = [...storageAddresses];
        const itemForUpdate: any = storageAddressesCache.find((item) => item.address === address);

        itemForUpdate.name = newName;
        setStorageAddresses(storageAddressesCache);
    };

    const connectMetamask = async (): Promise<any> => {
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
