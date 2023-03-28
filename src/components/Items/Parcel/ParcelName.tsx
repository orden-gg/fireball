import classNames from 'classnames';

import { CopyToClipboardBlock } from 'components/CopyToClipboard/CopyToClipboardBlock';

import { itemStyles } from '../styles';

export function ParcelName({ parcelHash }: { parcelHash: string }) {
  const classes = itemStyles();

  return (
    <CopyToClipboardBlock text={parcelHash}>
      <div className={classNames(classes.parcelName)}>{parcelHash}</div>
    </CopyToClipboardBlock>
  );
}
