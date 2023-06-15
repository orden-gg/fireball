import { useState } from 'react';

import { customPopupStyles } from './custom-popup.styles';

export function CustomPopup({ title, children }: { title: JSX.Element; children: JSX.Element | JSX.Element[] }) {
  const classes = customPopupStyles();

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const onHandleHover = (): void => {
    setIsPopupOpen(true);
  };

  const onHandleLeave = (): void => {
    setIsPopupOpen(false);
  };

  return (
    <div className={classes.popupWrapper} onMouseOver={onHandleHover} onMouseLeave={onHandleLeave}>
      {title}
      {isPopupOpen && (
        <div onClick={onHandleLeave} className={classes.popupBody}>
          {children}
        </div>
      )}
    </div>
  );
}
