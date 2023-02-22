export interface CustomTooltipProps {
  children: JSX.Element;
  title: string | JSX.Element;
  placement:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  disableInteractive?: boolean;
  followCursor?: boolean;
  enterTouchDelay?: number;
  className?: string;
  arrow?: boolean;
  open?: boolean;
}
