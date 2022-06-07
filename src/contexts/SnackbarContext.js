import { createContext, useState } from 'react';

export const SnackbarContext = createContext({});

const SnackbarContextProvider = (props) => {
    const [isOpen, setToOpen ] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success');

    const showSnackbar = (type, message) => {
        setType(type);
        setMessage(message);
        setToOpen(true);
    };

    const onSnackbarClose = () => {
        setType(type);
        setMessage('');
        setToOpen(false);
    };

    return (
        <SnackbarContext.Provider value={{ isOpen, type, message, showSnackbar, onSnackbarClose }}>
            { props.children }
        </SnackbarContext.Provider>
    );
};

export default SnackbarContextProvider;
