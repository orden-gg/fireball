import { CustomTooltipProps } from '../../components/custom/CustomTooltip';
export interface PageNavLink {
  path: string;
  icon?: JSX.Element;
  name?: string;
  isLoading?: boolean;
  count?: number | string;
  isShowSubRoutes?: boolean;
  subNavComponent?: JSX.Element;
  tooltip?: CustomTooltipProps;
}

export interface PageNavItem {
  path: string;
  name: string;
  icon: JSX.Element;
  isLoading: boolean;
  isLoaded: boolean;
  count: number;
}
