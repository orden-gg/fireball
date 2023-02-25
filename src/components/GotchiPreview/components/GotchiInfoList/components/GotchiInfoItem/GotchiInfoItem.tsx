import classNames from 'classnames';

import { CustomTooltip } from 'components/custom/CustomTooltip';

import { gotchiInfoItemStyles } from './styles';

interface GotchiInfoItemProps {
  label: string | JSX.Element | JSX.Element[];
  value: string | number;
  title?: JSX.Element;
  className?: string;
}

export function GotchiInfoItem({ label, value, title, className }: GotchiInfoItemProps) {
  const classes = gotchiInfoItemStyles();

  const renderItem = () => {
    return (
      <div className={classNames(classes.infoItem, className)}>
        <span className={classes.infoLabel}>{label}:</span>
        {value}
      </div>
    );
  };

  return title ? (
    <CustomTooltip className={classes.tooltip} title={title} placement='bottom' arrow>
      {renderItem()}
    </CustomTooltip>
  ) : (
    renderItem()
  );
}
