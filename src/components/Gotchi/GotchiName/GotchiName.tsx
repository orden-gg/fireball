import { CopyToClipboardBlock } from 'components/CopyToClipboard/CopyToClipboardBlock';

import { styles } from './styles';

export function GotchiName({ gotchi }: { gotchi: CustomAny }) {
  const classes = styles();

  return (
    <div className={classes.gotchiNameBox}>
      <CopyToClipboardBlock text={gotchi.name} className={classes.gotchiName}>
        {gotchi.name ? gotchi.name : 'Unnamed'}
      </CopyToClipboardBlock>
      <CopyToClipboardBlock text={gotchi.id} className={classes.gotchiId}>
        {gotchi.id}
      </CopyToClipboardBlock>
    </div>
  );
}
