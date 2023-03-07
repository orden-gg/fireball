export interface PageNavLink {
  path: string;
  icon?: JSX.Element;
  name?: string;
  isLoading?: boolean;
  count?: number | string;
  isShowSubRoutes?: boolean;
  subNavComponent?: JSX.Element;
  dropdown?: boolean;
}

export interface PageNavItem {
  path: string;
  name: string;
  icon: JSX.Element;
  isLoading: boolean;
  isLoaded: boolean;
  count: number;
}
