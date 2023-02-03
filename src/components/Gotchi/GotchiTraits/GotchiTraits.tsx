import classNames from 'classnames';

import { TRAITS_KEYS } from 'shared/constants';
import { GotchiUtils, ItemUtils } from 'utils';

import { styles } from './styles';

interface GotchiTraitsProps {
  traits: any;
  currentTraits: any;
  className?: string;
}

export function GotchiTraits({ traits, currentTraits, className }: GotchiTraitsProps) {
  const classes = styles();

  const renderDefaultTrait = (trait: any, index: number) => {
    if (index < traits.length - 2) {
      return <span className={classes.defaultVal}>({trait})</span>;
    }
  };

  return (
    <div className={classNames(classes.gotchiTraits, className)}>
      {traits.map((traitVal: any, index: number) => {
        const traitKey: any = ItemUtils.getTraitIconByName(TRAITS_KEYS[index]);

        return (
          <div
            className={classNames(classes.gotchiTrait, GotchiUtils.getRarityByTrait(currentTraits[index]))}
            key={index}
          >
            <img alt='trait icon' src={traitKey} className={classes.gotchiTraitIcon} />
            <p className={classes.mainVal}>
              <span>{currentTraits[index]}</span>
              {renderDefaultTrait(traitVal, index)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
