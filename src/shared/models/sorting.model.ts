export interface Sorting {
    type: string;
    dir: string;
}

export interface SortingListItem {
    name: string;
    key: string;
    tooltip: string;
    icon: JSX.Element;
    paramKey?: string;
}
