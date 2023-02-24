import { useState } from 'react';

import classNames from 'classnames';

import { CustomTooltip } from 'components/custom/CustomTooltip';

import { styles } from './styles';

const defaultTooltipText = (
  <span>
    copy to <span className='highlight'>clipboard</span>
  </span>
);

interface CopyToClipboardBlockProps {
  children: JSX.Element | JSX.Element[];
  text: string;
  className?: string;
}

export function CopyToClipboardBlock({ children, text, className }: CopyToClipboardBlockProps) {
  const classes = styles();

  const [tooltipText, setTooltipText] = useState<string | JSX.Element>(defaultTooltipText);

  const copyText = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, text: string) => {
    event.stopPropagation();

    toClipboard(text)
      .then(() => setTooltipText('copied!'))
      .catch(() => setTooltipText(defaultTooltipText));
  };

  const toClipboard = async (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <CustomTooltip title={tooltipText} placement='top' followCursor>
      <div
        className={classNames(classes.block, className)}
        onClick={(event) => copyText(event, text)}
        onMouseEnter={() => setTooltipText(defaultTooltipText)}
      >
        {children}
      </div>
    </CustomTooltip>
  );
}
