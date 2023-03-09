import { useState } from 'react';

import { customPopupStyles } from './custom-popup.styles';

export function CustomPopup({ title, children }: { title: JSX.Element; children: JSX.Element | JSX.Element[] }) {
  const classes = customPopupStyles();

  const [popupContent, setPopupContent] = useState<JSX.Element | JSX.Element[]>(<></>);

  const onHandleHover = (): void => {
    setPopupContent(children);
  };

  const onHandleLeave = (): void => {
    setPopupContent(<></>);
  };

  return (
    <div className={classes.popupWrapper} onMouseOver={onHandleHover} onMouseLeave={onHandleLeave}>
      {title}
      <div className={classes.popupBody}>{popupContent}</div>
    </div>
  );
}
