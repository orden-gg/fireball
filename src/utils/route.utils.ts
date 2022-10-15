import { NavigateFunction } from 'react-router-dom';

import { QueryParamSortingItem } from 'shared/models';

export class RouteUtils {
    public static updateQueryParams(
        navigate: NavigateFunction,
        pathname: string,
        qs: any,
        queryParams: QueryParamSortingItem,
        queryParamsOrder: string[]
    ): void {
        navigate({
            pathname,
            search: qs.stringify(queryParams, {
                sort: (a: string, b: string) => queryParamsOrder.indexOf(a) - queryParamsOrder.indexOf(b),
                arrayFormat: 'comma'
            })
        });
    }
}
