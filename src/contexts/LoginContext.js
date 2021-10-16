import React, {createContext, useState} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const LoginContext = createContext({});

const LoginContextProvider = (props) => {
    const [storageAddresses, setStorageAddresses] = useLocalStorage('LOGGED_ADDRESSES', JSON.parse(localStorage.getItem('LOGGED_ADDRESSES')) || []);
    const [storageActive, setStorageActive] = useLocalStorage('ACTIVE_ADDRESS', JSON.parse(localStorage.getItem('ACTIVE_ADDRESS')) || '');

    const [activeAddress, setActiveAddress] = useState(storageActive);

    const selectActiveAddress = (address) => {
        setStorageActive(address);
        setActiveAddress(address);
    };

    return (
        <LoginContext.Provider value={{
            storageAddresses,
            setStorageAddresses,
            activeAddress,
            selectActiveAddress,
        }}>
            { props.children }
        </LoginContext.Provider>
    )
}

export default LoginContextProvider;
