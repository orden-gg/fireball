import { useState } from 'react';

import classNames from 'classnames';

import { GOTCHI_SIDES } from 'shared/constants';
import { GotchiSvg } from 'components/Gotchi/GotchiImage/GotchiSvg';

import { gotchiImageStyles } from './styles';

interface GotchiImageProps {
  id: string;
  equippedSetName?: string;
}

export function GotchiImage({ id, equippedSetName }: GotchiImageProps) {
  const classes = gotchiImageStyles();

  const [view, setView] = useState<string>('svg');
  const [sideId, setSideId] = useState<number>(0);

  const changeSide = (name: string, id: number): void => {
    setView(name);
    setSideId(id);
  };

  return (
    <div className={classNames(classes.gotchiSvg, 'hide-bg')}>
      <GotchiSvg id={id} size='100%' view={view} />
      <div className={classes.imageSlider}>
        {GOTCHI_SIDES.map((name: string, id: number) => (
          <div className={classes.side} onMouseEnter={() => changeSide(name, id)} key={name}></div>
        ))}
        <div className={classNames(classes.side)} onMouseEnter={() => changeSide(GOTCHI_SIDES[0], 4)}></div>
        <div className={classNames(classes.sideLine, `view${sideId}`)}></div>
      </div>
      {equippedSetName && (
        <span className={classes.setName}>
          <span>{equippedSetName}</span>
        </span>
      )}
    </div>
  );
}
