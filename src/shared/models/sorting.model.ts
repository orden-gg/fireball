export interface SortingItem {
    type: string;
    dir: string;
}

export interface QueryParamSortingItem {
    sort: string;
    dir: string;
}

export interface SortingListItem {
    name: string;
    key: string;
    tooltip: string;
    icon: JSX.Element;
    paramKey?: string;
}

export interface Sorting {
    sortingList: SortingListItem[];
    sortingDefaults: SortingItem;
    onSortingChange: (sortBy: string, sortDir: string) => void;
}
