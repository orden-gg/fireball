export interface PageNavLink {
    path: string;
    icon: JSX.Element;
    name?: string;
    isLoading?: boolean;
    count?: number | string;
    isShowSubRoutes?: boolean;
    subNavComponent?: JSX.Element;
}
