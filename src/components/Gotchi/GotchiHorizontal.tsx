import classNames from 'classnames';

import { GotchiCollateral } from './GotchiCollateral/GotchiCollateral';
import { GotchiName } from './GotchiName/GotchiName';
import { GotchiLevel } from './GotchiLevel/GotchiLevel';
import { GotchiTraits } from './GotchiTraits/GotchiTraits';
import { HorizontalPrice } from '../Items/common/HorizontalPrice/HorizontalPrice';
import { GotchiImage } from './GotchiImage/GotchiImage';

import { styles } from './styles';

interface GotchiHorizontalProps {
  gotchi: any;
  render: any;
  item?: any;
}

export function GotchiHorizontal({ gotchi, item, render }: GotchiHorizontalProps) {
  const classes = styles();

  const gotchiSections = {
    wrapper: (children: any, className?: any) => {
      return (
        <div className={className && classes[className]} key={`${gotchi.id}-${className}`}>
          {children}
        </div>
      );
    },

    get collateral() {
      return <GotchiCollateral collateral={gotchi.collateral} key={`${gotchi.id}-collateral`} />;
    },

    get level() {
      return (
        <GotchiLevel
          level={gotchi.level}
          toNextLevel={gotchi.toNextLevel}
          experience={gotchi.experience}
          key={`${gotchi.id}-level`}
        />
      );
    },

    get traits() {
      return (
        <GotchiTraits
          traits={gotchi.numericTraits}
          currentTraits={gotchi.modifiedNumericTraits}
          key={`${gotchi.id}-numericTraits`}
        />
      );
    },

    get name() {
      return <GotchiName gotchi={gotchi} key={`${gotchi.id}-name`} />;
    },

    get svg() {
      return <GotchiImage gotchi={gotchi} key={`${gotchi.id}-svg`} />;
    },

    // price
    get price() {
      return <HorizontalPrice item={item} key={`${gotchi.id}-gotchi-price`} label='Sold for' />;
    }
  };

  function renderSection(value: any) {
    if (typeof value === 'string') {
      return gotchiSections[value];
    } else {
      return gotchiSections.wrapper(
        value.items.map((item: any) => renderSection(item)),
        value.className
      );
    }
  }

  return (
    <div className={classNames(classes.gotchi, `haunt${gotchi.hauntId}`, 'horizontal')}>
      {render.map((name: any) => {
        return renderSection(name);
      })}
    </div>
  );
}
