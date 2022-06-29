export interface PageNavLink {
    name: string;
    path: string;
    icon: JSX.Element;
    isLoading: boolean;
    count: number | string;
    isShowSubRoutes?: boolean;
    subNavComponent?: JSX.Element;
}
