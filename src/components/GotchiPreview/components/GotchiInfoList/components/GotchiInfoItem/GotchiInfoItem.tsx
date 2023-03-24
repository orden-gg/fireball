import { CircularProgress } from '@mui/material';

import classNames from 'classnames';

import { CustomTooltip } from 'components/custom/CustomTooltip';

import { gotchiInfoItemStyles } from './styles';

interface GotchiInfoItemProps {
  label: string;
  value: string | number;
  isLoaded?: boolean;
  title?: JSX.Element;
  className?: string;
}

export function GotchiInfoItem({ isLoaded = true, label, value, title, className }: GotchiInfoItemProps) {
  const classes = gotchiInfoItemStyles();

  const renderItem = () => {
    return (
      <div className={classNames(classes.infoItem, className)}>
        <span className={classes.infoLabel}>{label}:</span>
        {isLoaded ? value : <CircularProgress size={16} color='inherit' />}
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
