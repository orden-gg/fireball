import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimerIcon from '@mui/icons-material/Timer';

import classNames from 'classnames';
import { DateTime } from 'luxon';

import { EthAddress } from 'components/EthAddress/EthAddress';

import { styles } from './styles';

export function GotchiLendingStats({ gotchi }: { gotchi: CustomAny }) {
  const classes = styles();

  /**
        @const timeDiff - seconds
     */
  const timeDiff: number = DateTime.local().toSeconds() - gotchi.endTime;

  return (
    <div>
      <div className={classNames(classes.section, classes.head)}>
        <div className={classNames(classes.inner, timeDiff > 0 && 'over')}>
          {timeDiff > 0 ? (
            <TimerIcon className={classes.innerIcon} fontSize='small' />
          ) : (
            <AccessTimeIcon className={classes.innerIcon} fontSize='small' />
          )}

          {DateTime.fromSeconds(gotchi.endTime).toRelative()}
        </div>
      </div>

      <div className={classes.section}>
        <div className={classes.splits}>
          <div>owner</div>
          <div>
            <span className={gotchi.splitOwner > 0 ? 'highlight' : ''}>{gotchi.splitOwner}</span>%
          </div>
        </div>
        <div className={classes.splits}>
          <div>borrower</div>
          <div>
            <span className={gotchi.splitBorrower > 0 ? 'highlight' : ''}>{gotchi.splitBorrower}</span>%
          </div>
        </div>
        <div className={classes.splits}>
          <div>other</div>
          <div>
            <span className={gotchi.splitOther > 0 ? 'highlight' : ''}>{gotchi.splitOther}</span>%
          </div>
        </div>
      </div>

      <div className={classNames(classes.section, classes.bottom)}>
        <div className={classes.inner}>
          <EthAddress
            address={gotchi.borrower}
            isShowIcon={true}
            isClientLink={true}
            isCopyButton={true}
            isPolygonButton={true}
          />
        </div>
      </div>
    </div>
  );
}
