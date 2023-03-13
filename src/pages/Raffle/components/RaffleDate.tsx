import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { DateTime, Duration } from 'luxon';

import { useInterval } from 'hooks/useInterval';

import { raffleDataStyles } from '../styles';

interface RaffleDateProps {
  start: DateTime;
  end: DateTime;
}

/**
 *
 * @param start - either could be milliseconds or seconds, currently rely on seconds
 * @param end - either could be milliseconds or seconds, currently rely on seconds
 */
export function RaffleDate({ start, end }: RaffleDateProps) {
  const classes = raffleDataStyles();

  const [type, setType] = useState<any>(null);
  const [title, setTitle] = useState<any>(null);

  useEffect(() => {
    renderTitle();
  }, []);

  useInterval(() => {
    renderTitle();
  }, 1000);

  const renderTitle = (): void => {
    const local = DateTime.local().toSeconds();
    const diff = end.toSeconds() - local;

    if (local > start.toSeconds() && local < end.toSeconds()) {
      setType('live');
      setTitle(`live for ${Duration.fromObject({ seconds: diff }).toFormat('hh:mm:ss')}`);
    } else if (local < start.toSeconds()) {
      setType('upcoming');
      setTitle(start.toRelative());
    } else {
      setType('ended');
      setTitle(`ended ${end.toRelative()}`);
    }
  };

  if (!title) {
    <></>;
  }

  return <div className={classNames(classes.title, type)}>{title}</div>;
}
