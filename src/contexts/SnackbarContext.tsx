import { createContext, useState } from 'react';

export const SnackbarContext = createContext({});

export const SnackbarContextProvider = (props: CustomAny) => {
  const [isOpen, setToOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<string>('success');

  const showSnackbar = (type: string, message: string): void => {
    setType(type);
    setMessage(message);
    setToOpen(true);
  };

  const onSnackbarClose = (): void => {
    setType(type);
    setMessage('');
    setToOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ isOpen, type, message, showSnackbar, onSnackbarClose }}>
      {props.children}
    </SnackbarContext.Provider>
  );
};
